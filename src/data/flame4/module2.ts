import type { DsaLesson } from './types'
import { LINKED_LIST } from './fixtures'

// ─── Module 2 — Arrays, Linked Lists & Selection Sort ─────────────────────────

const NO_SORTING = {
  pattern: '\\bsorted\\s*\\(|\\.sort\\s*\\(',
  message: 'Write the sort yourself. No sorted() or .sort() in this lesson.',
}

export const module2: DsaLesson[] = [
  {
    id: 'flame4-7',
    title: 'How Memory Stores a List',
    concept: 'Arrays vs. linked lists',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 10,
    theory: {
      analogy: {
        title: 'A row of lockers vs. a scavenger hunt',
        body: "An array is a block of adjacent, numbered lockers rented all at once. Want locker 40? Walk straight to it. But if the block is full and the next locker belongs to someone else, adding one item means renting a bigger block somewhere else and carrying everything over. A linked list is a scavenger hunt: each item sits wherever there was room, holding a note that says where the next one is. Adding an item is just one more note. Reaching item 40, though, means following 39 notes.",
      },
      keyTerms: [
        { term: 'Array', definition: 'Items stored side by side in one contiguous block of memory.' },
        { term: 'Linked list', definition: 'Items scattered through memory; each one stores the address of the next.' },
        { term: 'Random access', definition: 'Jumping straight to any position. Arrays can; linked lists cannot.' },
        { term: 'Sequential access', definition: 'Reaching an item only by walking through the ones before it.' },
      ],
      walkthrough: [
        {
          label: 'Arrays read instantly',
          code: 'address of items[i] = start + i',
          explanation: 'Because the slots are adjacent, the computer calculates where any item lives. Reading by index is O(1).',
        },
        {
          label: 'Arrays insert slowly',
          code: 'insert X at the front of [A, B, C, D]\n-> shift D, C, B, A one slot right, then write X',
          explanation: 'Everything after the insertion point has to move: O(n). Deleting has the same cost in reverse. If the block is full, the whole array is copied to a bigger one.',
        },
        {
          label: 'Linked lists insert instantly',
          code: 'A -> B -> D      becomes      A -> B -> C -> D\n(point B at C, point C at D)',
          explanation: 'Nothing moves. Once you are standing at the right node, inserting or deleting is repointing a link or two: O(1).',
        },
        {
          label: 'Linked lists read slowly',
          explanation: 'There is no formula for where item 40 lives. You start at the first node and follow links: O(n).',
        },
        {
          label: 'The trade-off in one table',
          code: '            array    linked list\nread        O(1)     O(n)\ninsert      O(n)     O(1)\ndelete      O(n)     O(1)',
          explanation: "Neither wins everywhere. You choose by what your program does most. (Python's built-in list is an array underneath: items[i] is instant, items.insert(0, x) shifts everything.)",
        },
      ],
      memoryTip: 'Arrays: fast reads, slow inserts. Linked lists: fast inserts, slow reads.',
    },
    prompt: 'Study the table in the last step. The next lesson asks you to pick the right structure for five real workloads.',
  },

  {
    id: 'flame4-8',
    title: 'Array or Linked List?',
    concept: 'Choosing by workload',
    difficulty: 'kindling',
    exerciseType: 'quiz',
    xpReward: 15,
    theory: {
      analogy: {
        title: 'Pick the tool for the job you do most',
        body: 'A filing cabinet with numbered folders is perfect when people keep asking for "folder 212". A paper chain is perfect when you keep adding and removing links. Neither is better in general. The question is always: what does this program do a thousand times a second, and what does it do once a day?',
      },
      keyTerms: [
        { term: 'Read-heavy', definition: 'Mostly looking things up by position. Favors arrays.' },
        { term: 'Write-heavy', definition: 'Mostly inserting and deleting. Favors linked lists.' },
        { term: 'Queue', definition: 'A line: items join at the back and leave from the front.' },
      ],
      walkthrough: [
        {
          label: 'Ask what the common operation is',
          explanation: 'Jumping to arbitrary positions needs random access: array. Constant inserting and removing with no jumping around: linked list.',
        },
        {
          label: 'Remember what each one is bad at',
          code: 'array:        insert / delete = O(n)\nlinked list:  read by position = O(n)',
          explanation: 'An algorithm built on the wrong structure inherits its slow operation. Binary search on a linked list is the classic example.',
        },
      ],
      memoryTip: 'Name the most frequent operation first. The structure follows from it.',
    },
    quiz: [
      {
        question: 'A music player must jump to "track 847 of 5,000" instantly. Which structure fits?',
        options: [
          'A linked list, because tracks are played in order',
          'An array, because it gives random access by position',
          'Either: both reach track 847 in O(1)',
          'Neither can do this quickly',
        ],
        answer: 1,
        explanation: 'Jumping to an arbitrary position is exactly what arrays are good at: O(1). A linked list would follow 846 links first.',
      },
      {
        question: 'A print queue adds jobs at the back and removes them from the front all day. Nobody ever asks for "the 12th job". Which structure fits?',
        options: [
          'An array, because jobs are numbered',
          'An array, because deleting from the front is O(1)',
          'A linked list, because adding and removing at the ends is O(1) and no random access is needed',
          'It makes no difference',
        ],
        answer: 2,
        explanation: 'Removing the first item of an array shifts every remaining item forward: O(n). A linked list that remembers its first and last node handles both ends in O(1).',
      },
      {
        question: 'You run binary search over a linked list of sorted names. What goes wrong?',
        options: [
          'Nothing: it is still O(log n)',
          'Linked lists cannot hold sorted data',
          'Binary search would return the wrong answer',
          'Reaching the middle item takes O(n) link-following, so the halving trick loses its speed',
        ],
        answer: 3,
        explanation: 'Binary search depends on jumping to the middle instantly. Without random access, every "jump" is a walk, and the whole search is no better than a linear scan.',
      },
      {
        question: 'You insert a new item at the very front of an array holding 1,000,000 items. What has to happen?',
        options: [
          'All 1,000,000 existing items shift over by one slot',
          'Only the first item moves',
          'Nothing moves; the new item is linked in',
          'The array is sorted again',
        ],
        answer: 0,
        explanation: 'Array slots are adjacent, so making room at the front means moving everything after it: O(n).',
      },
      {
        question: 'An address book keeps an array of 26 slots, one per letter. Each slot points to a linked list of the names starting with that letter. Compared with one long linked list of all names, looking up "Zara" is...',
        options: [
          'Slower, because there are two structures to search',
          'Faster: jump to the Z slot in O(1), then walk only the Z names',
          'Exactly the same',
          'Impossible without sorting first',
        ],
        answer: 1,
        explanation: 'The array narrows the search to one short list instantly. Combining an array (fast jump) with linked lists (cheap inserts) is the idea behind hash tables, which you will build in Module 5.',
      },
    ],
  },

  {
    id: 'flame4-9',
    title: 'Walking a Linked List',
    concept: 'Sequential access',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 20,
    theory: {
      analogy: {
        title: 'Follow the notes',
        body: 'On a scavenger hunt you cannot skip to clue 4. You open clue 1, which tells you where clue 2 is, which tells you where clue 3 is. A linked list works the same way: all you ever hold is the first node, and every other node is reached by asking the previous one "who is next?"',
      },
      keyTerms: [
        { term: 'Node', definition: 'One element of a linked list: a value plus a reference to the next node.' },
        { term: 'head', definition: 'The first node. It is the only entry point into the list.' },
        { term: '.next', definition: 'The link to the following node, or None at the end of the list.' },
      ],
      walkthrough: [
        {
          label: 'What a node looks like',
          code: 'class Node:\n    def __init__(self, value, next=None):\n        self.value = value\n        self.next = next',
          explanation: 'This class is already defined for you in this lesson.',
        },
        {
          label: 'Stepping forward',
          code: 'node = head\nnode = node.next   # now on the second node\nnode = node.next   # now on the third',
          explanation: 'Each assignment follows one link. Reaching index i takes i steps.',
        },
        {
          label: 'Running off the end',
          code: 'if node is None:\n    return None',
          explanation: 'After the last node, .next is None. Check before you touch .value or .next, or Python raises an AttributeError.',
        },
      ],
      memoryTip: 'In a linked list, "go to index i" always means "take i steps from the head".',
    },
    prompt: 'Write `get_at(head, index)`. Starting from `head`, follow `.next` links and return the **value** stored at that position (0 is the head). Return `None` if the list is too short.',
    explanation: 'In the tests, `chain("a", "b", "c")` builds the list a → b → c and hands you its head. `chain()` with no arguments gives you `None`: an empty list.',
    hint: 'Set `node = head`, then loop `index` times doing `node = node.next`, returning `None` early if `node` is `None`. After the loop, return `node.value` (unless node is None).',
    setupCode: LINKED_LIST,
    starterCode: `# Already defined for you:
#
#   class Node:
#       def __init__(self, value, next=None):
#           self.value = value
#           self.next = next   # the next Node, or None at the end

def get_at(head, index):
    pass
`,
    tests: [
      { call: 'get_at(chain("a", "b", "c", "d"), 0)', expected: "'a'" },
      { call: 'get_at(chain("a", "b", "c", "d"), 2)', expected: "'c'" },
      { call: 'get_at(chain("a", "b", "c", "d"), 3)', expected: "'d'" },
      { call: 'get_at(chain("a", "b", "c", "d"), 4)', expected: 'None' },
      { call: 'get_at(chain("a", "b", "c", "d"), 9)', expected: 'None' },
      { call: 'get_at(chain(7), 0)', expected: '7' },
      { call: 'get_at(chain(), 0)', expected: 'None' },
    ],
    solutionCode: `def get_at(head, index):
    node = head
    for _ in range(index):
        if node is None:
            return None
        node = node.next
    if node is None:
        return None
    return node.value
`,
    complexity: 'O(n) time · O(1) extra space',
    solutionExplanation: 'There is no way to compute where the i-th node lives, so the function takes i steps from the head. The two None checks cover running off the end during the walk and landing exactly one past the last node.',
  },

  {
    id: 'flame4-10',
    title: 'The O(1) Insert',
    concept: 'Rewiring links',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 20,
    theory: {
      analogy: {
        title: 'Adding a carriage to a train',
        body: 'To add a carriage in the middle of a train you do not move the other carriages. You uncouple at one point, couple the new carriage to the one behind, then couple the one in front to the new carriage. Two connections, regardless of how long the train is.',
      },
      keyTerms: [
        { term: 'Insert after', definition: 'Place a new node directly behind an existing one by changing two links.' },
        { term: 'Order of rewiring', definition: 'The new node must grab the old "next" before the existing node lets go of it.' },
      ],
      walkthrough: [
        {
          label: 'Before',
          code: 'node -> rest...',
          explanation: 'node.next currently points at the rest of the list.',
        },
        {
          label: 'Hook the new node to the rest first',
          code: 'new = Node(value, node.next)',
          explanation: 'The new node now points at what used to follow node. Nothing is lost.',
        },
        {
          label: 'Then point node at the new node',
          code: 'node.next = new',
          explanation: 'Result: node -> new -> rest. Do these two steps in the other order and the rest of the list is orphaned.',
        },
      ],
      memoryTip: 'New node grabs the tail first; then the old node grabs the new node.',
    },
    prompt: 'Write `insert_after(node, value)`. Create a new `Node` holding `value` and splice it in directly after `node`. Nothing needs to be returned.',
    explanation: 'Each test builds a list, walks to one of its nodes, calls your function on that node, then reads the whole list back.',
    hint: '`node.next = Node(value, node.next)` does both steps at once: the right-hand side is built before the assignment happens.',
    setupCode: LINKED_LIST,
    starterCode: `# Node(value, next=None) is already defined.

def insert_after(node, value):
    pass
`,
    tests: [
      { name: 'a -> c, insert "b" after a', call: 'splice(["a", "c"], 0, "b")', expected: "['a', 'b', 'c']" },
      { name: 'a -> b, insert "c" after b (the tail)', call: 'splice(["a", "b"], 1, "c")', expected: "['a', 'b', 'c']" },
      { name: '1, insert 2 after it', call: 'splice([1], 0, 2)', expected: '[1, 2]' },
      { name: '1 -> 2 -> 3 -> 4 -> 5, insert 99 after 3', call: 'splice([1, 2, 3, 4, 5], 2, 99)', expected: '[1, 2, 3, 99, 4, 5]' },
    ],
    solutionCode: `def insert_after(node, value):
    node.next = Node(value, node.next)
`,
    complexity: 'O(1) time · O(1) extra space',
    solutionExplanation: 'Python evaluates `Node(value, node.next)` first, so the new node captures the old tail before `node.next` is overwritten. No other node is touched, which is why the cost does not depend on the length of the list.',
  },

  {
    id: 'flame4-11',
    title: 'Find the Smallest',
    concept: 'One pass, one champion',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 20,
    theory: {
      analogy: {
        title: 'Finding the shortest person in a line',
        body: 'Walk down the line with your hand on the shoulder of the shortest person seen so far. At each new person, compare. If they are shorter, move your hand. At the end of the line your hand is on the answer, and you looked at everyone exactly once.',
      },
      keyTerms: [
        { term: 'Running minimum', definition: 'The best candidate seen so far, updated as you scan.' },
        { term: 'Index vs. value', definition: 'Here you track WHERE the smallest item is, because the next lesson needs to remove it from that position.' },
      ],
      walkthrough: [
        {
          label: 'Assume the first is smallest',
          code: 'smallest_index = 0',
          explanation: 'You need a starting champion. The first item is as good as any.',
        },
        {
          label: 'Challenge it with every other item',
          code: 'for i in range(1, len(arr)):\n    if arr[i] < arr[smallest_index]:\n        smallest_index = i',
          explanation: 'Strictly less-than means an equal item later on does not take over, so ties go to the earliest position.',
        },
      ],
      memoryTip: 'Finding a minimum is always O(n): you cannot know it is the smallest without looking at everything.',
    },
    prompt: 'Write `find_smallest(arr)`. Return the **index** of the smallest value in a non-empty list. If the smallest value appears more than once, return the first position.',
    hint: 'Keep `smallest_index`, starting at 0. Loop `i` from 1 to the end and update it whenever `arr[i] < arr[smallest_index]`.',
    starterCode: `def find_smallest(arr):
    smallest_index = 0
    # Compare every other position against the current smallest.
    return smallest_index
`,
    tests: [
      { call: 'find_smallest([5, 3, 6, 2, 10])', expected: '3' },
      { call: 'find_smallest([1, 2, 3])', expected: '0' },
      { call: 'find_smallest([9, 8, 7])', expected: '2' },
      { call: 'find_smallest([4])', expected: '0' },
      { call: 'find_smallest([3, 1, 1, 2])', expected: '1' },
      { call: 'find_smallest([-2, -7, 0])', expected: '1' },
    ],
    forbidden: [
      {
        pattern: '\\bmin\\s*\\(|\\.index\\s*\\(|\\bsorted\\s*\\(|\\.sort\\s*\\(',
        message: 'Scan the list yourself. No min(), .index() or sorting in this lesson.',
      },
    ],
    solutionCode: `def find_smallest(arr):
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < arr[smallest_index]:
            smallest_index = i
    return smallest_index
`,
    complexity: 'O(n) time · O(1) extra space',
    solutionExplanation: 'One pass with a running champion. Every item is compared once, and only a strictly smaller item replaces the champion, so the earliest of several equal minimums is kept.',
  },

  {
    id: 'flame4-12',
    title: 'Selection Sort',
    concept: 'Your first sorting algorithm',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 30,
    theory: {
      analogy: {
        title: 'Sorting a hand of cards the slow way',
        body: 'Spread your cards on the table. Scan them all, pick up the lowest, and put it in your hand. Scan what is left, pick up the lowest again. Repeat until the table is empty. Your hand is sorted, and you scanned the table once for every single card.',
      },
      keyTerms: [
        { term: 'Selection sort', definition: 'Repeatedly select the smallest remaining item and move it to the end of the sorted output.' },
        { term: 'O(n²)', definition: 'Quadratic time. Doing an O(n) job n times. Ten times more data means a hundred times more work.' },
      ],
      walkthrough: [
        {
          label: 'Select, move, repeat',
          code: 'remaining: [5, 3, 6, 2, 10]   result: []\nremaining: [5, 3, 6, 10]      result: [2]\nremaining: [5, 6, 10]         result: [2, 3]\nremaining: [6, 10]            result: [2, 3, 5]',
          explanation: 'Each round finds the smallest remaining item and appends it to the result.',
        },
        {
          label: 'Removing by index',
          code: 'value = remaining.pop(i)',
          explanation: 'list.pop(i) removes the item at index i and gives it back to you.',
        },
        {
          label: 'Counting the work',
          code: 'scans: n + (n-1) + (n-2) + ... + 1  =  n(n+1)/2',
          explanation: 'About half of n squared. Big O drops the one-half, leaving O(n²). The scans get shorter, but not fast enough to change the shape of the growth.',
        },
      ],
      memoryTip: 'A loop that runs n times around an O(n) job is O(n²). Spot that shape and you can predict the slowdown.',
    },
    prompt: 'Write `selection_sort(arr)`. Return a **new list** with the same items in ascending order, built by repeatedly taking out the smallest remaining item.',
    explanation: '`find_smallest` from the last lesson is provided. Your job is the loop around it.',
    hint: 'Copy the input with `remaining = list(arr)`. While `remaining` is not empty: find the smallest index, `pop` that item, and `append` it to your result list.',
    starterCode: `def find_smallest(arr):
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < arr[smallest_index]:
            smallest_index = i
    return smallest_index


def selection_sort(arr):
    # Repeatedly pull the smallest remaining item out
    # and append it to a new list. Return the new list.
    pass
`,
    tests: [
      { call: 'selection_sort([5, 3, 6, 2, 10])', expected: '[2, 3, 5, 6, 10]' },
      { call: 'selection_sort([9, 7, 5, 3, 1])', expected: '[1, 3, 5, 7, 9]' },
      { call: 'selection_sort([3, 3, 1, 2, 1])', expected: '[1, 1, 2, 3, 3]' },
      { call: 'selection_sort(["pear", "apple", "fig"])', expected: "['apple', 'fig', 'pear']" },
      { call: 'selection_sort([1])', expected: '[1]' },
      { call: 'selection_sort([])', expected: '[]' },
    ],
    forbidden: [NO_SORTING],
    solutionCode: `def find_smallest(arr):
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < arr[smallest_index]:
            smallest_index = i
    return smallest_index


def selection_sort(arr):
    remaining = list(arr)
    result = []
    while remaining:
        smallest = find_smallest(remaining)
        result.append(remaining.pop(smallest))
    return result
`,
    complexity: 'O(n²) time · O(n) extra space',
    solutionExplanation: 'The while loop runs once per item, and each round scans everything still remaining. That is n + (n-1) + ... + 1 comparisons, roughly n²/2, which is O(n²). Copying the input first means the caller\'s list is left untouched.',
  },

  {
    id: 'flame4-13',
    title: 'Counting the Work',
    concept: 'Why selection sort is O(n²)',
    difficulty: 'kindling',
    exerciseType: 'quiz',
    xpReward: 15,
    theory: {
      analogy: {
        title: 'Handshakes at a meeting',
        body: 'If everyone in a room of 5 shakes hands with everyone else, that is 10 handshakes. In a room of 50 it is 1,225. The room got 10 times bigger and the handshakes got about 100 times more numerous. Selection sort grows the same way, because every item gets compared against most of the others.',
      },
      keyTerms: [
        { term: 'Quadratic growth', definition: 'Work proportional to n². Multiply the input by k and the work multiplies by k².' },
        { term: 'Dropping constants', definition: 'n²/2 and n² differ only by a fixed factor, so both are written O(n²).' },
      ],
      walkthrough: [
        {
          label: 'Add up the scans',
          code: 'n = 5:  5 + 4 + 3 + 2 + 1 = 15',
          explanation: 'The first round looks at 5 items, the next at 4, and so on.',
        },
        {
          label: 'The general formula',
          code: 'n + (n-1) + ... + 1 = n(n+1)/2  ≈  n²/2',
          explanation: 'On average each round scans half the list, and there are n rounds.',
        },
        {
          label: 'Big O keeps only the shape',
          code: 'O(n²/2)  ->  O(n²)',
          explanation: 'Halving the work does not change how it scales. Going from 1,000 to 10,000 items still costs 100 times more.',
        },
      ],
      memoryTip: 'For O(n²): 10 times the data, 100 times the work.',
    },
    quiz: [
      {
        question: 'Selection sort runs on 5 items. Counting one "look" per item scanned, how many looks does it make in total?',
        options: ['5', '10', '15', '25'],
        answer: 2,
        explanation: 'The rounds scan 5, 4, 3, 2 and 1 items: 5 + 4 + 3 + 2 + 1 = 15.',
      },
      {
        question: 'For n items that sum is about n²/2. How is selection sort written in Big O?',
        options: ['O(n²/2)', 'O(n²)', 'O(n)', 'O(n log n)'],
        answer: 1,
        explanation: 'The 1/2 is a constant factor and Big O drops it. The growth is quadratic: O(n²).',
      },
      {
        question: 'A list grows from 1,000 items to 10,000 items. Roughly how much more work does selection sort do?',
        options: ['10 times more', '20 times more', '100 times more', '1,000 times more'],
        answer: 2,
        explanation: 'Quadratic growth squares the multiplier: 10 times the items means 10² = 100 times the work. That is why O(n²) sorts are fine for small lists and painful for large ones.',
      },
    ],
  },

  {
    id: 'flame4-14',
    title: 'Trial: Rank the Playlist',
    concept: 'Selection sort on real data',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 50,
    theory: {
      analogy: {
        title: 'Building a top-five chart',
        body: 'You have play counts for every artist on your phone and want a chart, most played first. Find the artist with the highest count, write their name at the top, cross them off. Find the highest among those left, write them second. That is selection sort again, selecting the largest instead of the smallest.',
      },
      keyTerms: [
        { term: 'Sort key', definition: 'The value you order by. Here you order artist names by their play counts.' },
        { term: 'Descending order', definition: 'Largest first. Select the maximum each round instead of the minimum.' },
      ],
      walkthrough: [
        {
          label: 'Looping over a dict',
          code: 'for artist in plays:\n    count = plays[artist]',
          explanation: 'Iterating a dict gives you its keys. Index with the key to get the value.',
        },
        {
          label: 'Removing a key',
          code: 'del remaining[artist]',
          explanation: 'Work on a copy (dict(plays)) so the caller\'s data survives.',
        },
        {
          label: 'Same algorithm, new details',
          explanation: 'Each round: scan the remaining artists for the highest count, append that name to the ranking, remove it, repeat until nothing is left.',
        },
      ],
      memoryTip: 'An algorithm is a pattern. Selection sort does not care whether it is selecting numbers from a list or artists from a dict.',
    },
    prompt: 'Write `rank_artists(plays)`. `plays` maps artist name to play count. Return a list of artist **names**, most played first. Use the selection idea; play counts in the tests are all different.',
    hint: 'Copy the dict. While the copy is not empty: loop over it to find the key with the largest value, append that key to your result, then `del` it from the copy.',
    starterCode: `def rank_artists(plays):
    pass
`,
    tests: [
      {
        call: 'rank_artists({"Nova": 156, "Echo": 141, "Rill": 35, "Vex": 94, "Juno": 88})',
        expected: "['Nova', 'Echo', 'Vex', 'Juno', 'Rill']",
      },
      { call: 'rank_artists({"x": 50, "y": 7, "z": 300, "w": 120})', expected: "['z', 'w', 'x', 'y']" },
      { call: 'rank_artists({"a": 1, "b": 2, "c": 3})', expected: "['c', 'b', 'a']" },
      { call: 'rank_artists({"Solo": 1})', expected: "['Solo']" },
      { call: 'rank_artists({})', expected: '[]' },
    ],
    forbidden: [NO_SORTING],
    solutionCode: `def rank_artists(plays):
    remaining = dict(plays)
    ranked = []
    while remaining:
        top = None
        for artist in remaining:
            if top is None or remaining[artist] > remaining[top]:
                top = artist
        ranked.append(top)
        del remaining[top]
    return ranked
`,
    complexity: 'O(n²) time · O(n) extra space',
    solutionExplanation: 'Each pass of the while loop scans every remaining artist to find the current maximum, then removes it. n rounds of an O(n) scan is O(n²), exactly like selection sort on a list. In Module 4 you will write a sort that does this job in O(n log n).',
  },
]
