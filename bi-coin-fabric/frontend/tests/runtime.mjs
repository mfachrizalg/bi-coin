import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const FRONTEND_ROOT = path.resolve(import.meta.dirname, '..')
const SRC_ROOT = path.join(FRONTEND_ROOT, 'src')

const REACT_HOOKS_MODULE = `
let currentRuntime = null

export function __setRuntime(nextRuntime) {
  currentRuntime = nextRuntime
}

function requireRuntime() {
  if (!currentRuntime) throw new Error('test runtime not set')
  return currentRuntime
}

export function useState(initialValue) {
  return requireRuntime().useState(initialValue)
}

export function useEffect(effect, deps) {
  return requireRuntime().useEffect(effect, deps)
}

export function useMemo(factory, deps) {
  return requireRuntime().useMemo(factory, deps)
}
`

const JSX_RUNTIME_MODULE = `
export const Fragment = Symbol.for('fragment')

export function jsx(type, props, key) {
  return { type, key, props: props ?? {} }
}

export const jsxs = jsx
`

function resolveSource(specifier, fromFile) {
  const base = path.resolve(path.dirname(fromFile), specifier)
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')]) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error(`Cannot resolve ${specifier} from ${fromFile}`)
}

function rewriteImports(code, compiledFile, hooksModulePath, jsxModulePath) {
  return code
    .replace(/import\.meta\.env/g, 'globalThis.__TEST_IMPORT_META_ENV__')
    .replace(/from\s+['"]react['"]/g, `from ${JSON.stringify(path.relative(path.dirname(compiledFile), hooksModulePath).replace(/\\/g, '/'))}`)
    .replace(/from\s+['"]react\/jsx-runtime['"]/g, `from ${JSON.stringify(path.relative(path.dirname(compiledFile), jsxModulePath).replace(/\\/g, '/'))}`)
    .replace(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g, (_, specifier) => {
      const withExtension = specifier.endsWith('.mjs') ? specifier : `${specifier}.mjs`
      return `from ${JSON.stringify(withExtension)}`
    })
}

function collectRelativeImports(source) {
  return Array.from(source.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g), match => match[1])
}

export function compileFrontendModule(relativePath) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-coin-frontend-'))
  const hooksModulePath = path.join(tempRoot, '__test_react__.mjs')
  const jsxModulePath = path.join(tempRoot, '__test_jsx_runtime__.mjs')
  fs.writeFileSync(hooksModulePath, REACT_HOOKS_MODULE)
  fs.writeFileSync(jsxModulePath, JSX_RUNTIME_MODULE)

  const seen = new Set()

  function compileOne(sourceFile) {
    const normalized = path.resolve(sourceFile)
    if (seen.has(normalized)) return
    seen.add(normalized)

    const source = fs.readFileSync(normalized, 'utf8')
    for (const specifier of collectRelativeImports(source)) {
      compileOne(resolveSource(specifier, normalized))
    }

    const compiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ES2022,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
      fileName: normalized,
    }).outputText

    const relativeSourcePath = path.relative(SRC_ROOT, normalized)
    const outPath = path.join(tempRoot, relativeSourcePath).replace(/\.(ts|tsx)$/, '.mjs')
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, rewriteImports(compiled, outPath, hooksModulePath, jsxModulePath))
  }

  compileOne(path.join(SRC_ROOT, relativePath))

  return {
    moduleUrl: pathToFileURL(path.join(tempRoot, relativePath).replace(/\.(ts|tsx)$/, '.mjs')).href,
    hooksModuleUrl: pathToFileURL(hooksModulePath).href,
  }
}

function depsChanged(previous, next) {
  if (previous === undefined || next === undefined) return true
  if (previous.length !== next.length) return true
  for (let i = 0; i < next.length; i += 1) {
    if (!Object.is(previous[i], next[i])) return true
  }
  return false
}

export function createRenderer(hooksModule, Component, initialProps) {
  let props = initialProps
  let hookIndex = 0
  const hookState = []
  const memoState = []
  const effectState = []
  let pendingEffects = []
  let tree = null

  const runtime = {
    useState(initialValue) {
      const index = hookIndex
      hookIndex += 1
      if (!(index in hookState)) {
        hookState[index] = typeof initialValue === 'function' ? initialValue() : initialValue
      }
      return [
        hookState[index],
        nextValue => {
          hookState[index] = typeof nextValue === 'function' ? nextValue(hookState[index]) : nextValue
        },
      ]
    },
    useEffect(effect, deps) {
      const index = hookIndex
      hookIndex += 1
      if (depsChanged(effectState[index], deps)) {
        effectState[index] = deps ? [...deps] : undefined
        pendingEffects.push(effect)
      }
    },
    useMemo(factory, deps) {
      const index = hookIndex
      hookIndex += 1
      const memo = memoState[index]
      if (!memo || depsChanged(memo.deps, deps)) {
        const value = factory()
        memoState[index] = { deps: deps ? [...deps] : undefined, value }
        return value
      }
      return memo.value
    },
  }

  function render(nextProps = props) {
    props = nextProps
    hookIndex = 0
    pendingEffects = []
    hooksModule.__setRuntime(runtime)
    try {
      tree = Component(props)
      return tree
    } finally {
      hooksModule.__setRuntime(null)
    }
  }

  async function flushEffects() {
    const effects = pendingEffects
    pendingEffects = []
    for (const effect of effects) effect()
    await new Promise(resolve => setImmediate(resolve))
    await Promise.resolve()
  }

  return {
    render,
    async settle() {
      await flushEffects()
      render()
      await flushEffects()
      render()
      return tree
    },
    getTree() {
      return tree
    },
  }
}

export function walkTree(node, visit) {
  if (node == null || typeof node === 'boolean') return
  if (Array.isArray(node)) {
    for (const child of node) walkTree(child, visit)
    return
  }
  if (typeof node === 'string' || typeof node === 'number') return
  visit(node)
  walkTree(node.props?.children, visit)
}

export function textContent(node) {
  if (node == null || typeof node === 'boolean') return ''
  if (Array.isArray(node)) return node.map(textContent).join('')
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  return textContent(node.props?.children)
}

export function findAll(node, predicate) {
  const matches = []
  walkTree(node, current => {
    if (predicate(current)) matches.push(current)
  })
  return matches
}

export function findByText(node, type, text) {
  return findAll(node, current => current.type === type && textContent(current).includes(text))[0]
}

export function findByPlaceholder(node, placeholder) {
  return findAll(node, current => current.type === 'input' && current.props?.placeholder === placeholder)[0]
}

export function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'ERROR',
    async json() {
      return body
    },
  }
}
