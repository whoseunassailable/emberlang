// Hidden Python fixtures for DSA lessons (passed as a lesson's setupCode).
// The harness re-runs these before every test, so each test sees fresh data.

// A sorted sequence that counts every element the learner's code looks at.
// Lets a test tell binary search (a handful of reads) from a linear scan.
export const PROBE = `
class Probe:
    def __init__(self, data):
        self._data = list(data)
        self.reads = 0

    def __len__(self):
        return len(self._data)

    def __getitem__(self, i):
        if isinstance(i, slice):
            part = self._data[i]
            self.reads += len(part)
            return part
        self.reads += 1
        return self._data[i]


def check_reads(search, n, target, limit):
    data = Probe(range(0, 2 * n, 2))
    search(data, target)
    if data.reads > limit:
        return f'looked at {data.reads} items (limit {limit})'
    return 'ok'
`

export const LINKED_LIST = `
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next


def chain(*values):
    head = None
    for v in reversed(values):
        head = Node(v, head)
    return head


def to_list(head):
    out = []
    node = head
    while node is not None:
        if len(out) >= 50:
            out.append('... (cycle?)')
            break
        out.append(node.value)
        node = node.next
    return out


def splice(values, at, value):
    head = chain(*values)
    node = head
    for _ in range(at):
        node = node.next
    insert_after(node, value)
    return to_list(head)
`

export const TRAILS = `
TRAILS = {
    "camp":   ["creek", "ridge"],
    "creek":  ["falls"],
    "ridge":  ["falls", "summit"],
    "falls":  ["summit"],
    "summit": [],
}

LOOP = {
    "a": ["b"],
    "b": ["c"],
    "c": ["a"],
    "d": [],
}
`

export const METRO = `
METRO = {
    "airport": ["harbor", "museum"],
    "harbor":  ["airport", "market"],
    "museum":  ["airport", "park"],
    "market":  ["harbor", "park", "stadium"],
    "park":    ["museum", "market", "zoo"],
    "stadium": ["market", "zoo"],
    "zoo":     ["park", "stadium"],
    "depot":   [],
}
`

export const NETWORK = `
NETWORK = {
    "you":  ["ana", "raj", "kim"],
    "ana":  ["lee"],
    "raj":  ["lee", "omar"],
    "kim":  ["tess"],
    "lee":  ["vera", "ana"],
    "omar": [],
    "tess": ["vera"],
    "vera": [],
}
`

export const CITY = `
CITY = {
    "home":   {"cafe": 5, "gym": 2},
    "gym":    {"cafe": 1, "office": 9},
    "cafe":   {"office": 4},
    "office": {},
    "island": {"home": 1},
}

LOOPY = {
    "a": {"b": 4, "c": 1},
    "b": {"a": 4, "d": 1},
    "c": {"a": 1, "b": 2, "d": 5},
    "d": {"b": 1, "c": 5},
}
`

export const STATIONS = `
STATIONS = {
    "north":  {"or", "wa", "id"},
    "coast":  {"wa", "ca", "or"},
    "desert": {"nv", "az", "ut"},
    "peaks":  {"id", "mt", "ut"},
    "south":  {"ca", "az"},
}

ALL_STATES = {"wa", "or", "id", "mt", "ca", "nv", "az", "ut"}


def cover_report(chosen, must_cover, max_size):
    if not isinstance(chosen, (set, list, tuple)):
        return f'expected a set of station names, got {type(chosen).__name__}'
    unknown = [s for s in chosen if s not in STATIONS]
    if unknown:
        return f'unknown station {unknown[0]!r}'
    covered = set()
    for s in chosen:
        covered |= STATIONS[s]
    missing = sorted(set(must_cover) - covered)
    if missing:
        return 'not covered: ' + ', '.join(missing)
    if len(set(chosen)) > max_size:
        return f'used {len(set(chosen))} stations; greedy needs at most {max_size}'
    return 'ok'
`

export const FRUIT = `
FRUIT = [
    ([6.0, 3.0], "orange"),
    ([6.5, 3.5], "orange"),
    ([7.0, 2.5], "orange"),
    ([6.8, 4.0], "orange"),
    ([9.2, 7.4], "orange"),
    ([9.0, 7.0], "grapefruit"),
    ([9.5, 8.0], "grapefruit"),
    ([10.0, 6.5], "grapefruit"),
    ([8.8, 7.5], "grapefruit"),
]
`

export const RENTALS = `
RENTALS = [
    ([9, 1], 120),
    ([8, 1], 110),
    ([8, 0], 70),
    ([7, 0], 64),
    ([4, 1], 55),
    ([3, 0], 22),
    ([2, 0], 15),
    ([1, 1], 30),
]
`

export const SERVER = `
class Server:
    def __init__(self):
        self.hits = 0

    def fetch(self, url):
        self.hits += 1
        return 'page for ' + url


def server_hits(urls):
    server = Server()
    cache = {}
    for url in urls:
        get_page(url, cache, server.fetch)
    return server.hits
`
