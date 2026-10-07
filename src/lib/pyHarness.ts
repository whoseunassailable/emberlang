// Python side of the DSA exercise runner. Loaded once into Pyodide; shared by
// the browser worker (pyWorker.ts) and scripts/verify-dsa.mjs so lessons are
// checked against the exact code that grades them in the app.
//
// __ember_run(user_code, setup_code, tests_json) -> JSON string:
//   { error, stdout, tests: [{ name, passed, expected, actual, error }] }
export const PY_HARNESS = String.raw`
import contextlib, io, json, math, traceback

_USER_FILE = '<your code>'
_MAX_OUT = 8000


def _describe(exc):
    kind = type(exc).__name__
    if isinstance(exc, SyntaxError):
        where = f' (line {exc.lineno})' if exc.filename == _USER_FILE and exc.lineno else ''
        return f'{kind}: {exc.msg}{where}'
    line = None
    for frame in traceback.extract_tb(exc.__traceback__):
        if frame.filename == _USER_FILE:
            line = frame.lineno
    if isinstance(exc, RecursionError):
        msg = 'maximum recursion depth exceeded. Is a base case missing?'
    else:
        msg = str(exc)
    where = f' (line {line})' if line else ''
    return f'{kind}: {msg}{where}' if msg else f'{kind}{where}'


def _show(value):
    text = repr(value)
    return text if len(text) <= 300 else text[:297] + '...'


def _same(actual, expected, approx):
    if approx and isinstance(actual, (int, float)) and not isinstance(actual, bool):
        return math.isclose(actual, expected, rel_tol=1e-6, abs_tol=1e-6)
    return actual == expected


def __ember_run(user_code, setup_code, tests_json):
    tests = json.loads(tests_json)
    out = io.StringIO()
    result = {'error': None, 'stdout': '', 'tests': []}
    ns = {'__name__': '__main__'}
    with contextlib.redirect_stdout(out):
        try:
            exec(compile(setup_code, '<setup>', 'exec'), ns)
            exec(compile(user_code, _USER_FILE, 'exec'), ns)
        except BaseException as exc:
            result['error'] = _describe(exc)
        else:
            for t in tests:
                r = {'name': t['name'], 'passed': False, 'expected': '', 'actual': '', 'error': None}
                try:
                    # Re-run setup so every test gets fresh fixtures, even if
                    # the previous call mutated them.
                    exec(compile(setup_code, '<setup>', 'exec'), ns)
                    expected = eval(t['expected'], ns)
                    actual = eval(t['call'], ns)
                    r['expected'] = _show(expected)
                    r['actual'] = _show(actual)
                    r['passed'] = bool(_same(actual, expected, t.get('approx', False)))
                except BaseException as exc:
                    r['error'] = _describe(exc)
                result['tests'].append(r)
    text = out.getvalue()
    result['stdout'] = text if len(text) <= _MAX_OUT else text[:_MAX_OUT] + '\n... output truncated'
    return json.dumps(result)
`

// Some lessons ban a shortcut (sorted(), loops in a recursion drill, ...).
// Returns the message for the first banned construct found, or null.
export function checkForbidden(
  code: string,
  forbidden: { pattern: string; message: string }[] = []
): string | null {
  const stripped = code.replace(/#.*$/gm, '')
  const hit = forbidden.find((f) => new RegExp(f.pattern).test(stripped))
  return hit ? hit.message : null
}
