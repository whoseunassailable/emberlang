import type { DsaLesson } from './types'
import { PROBE } from './fixtures'

// ─── Module 1 — Search & Big O ────────────────────────────────────────────────

export const module1: DsaLesson[] = [
  {
    id: 'flame4-1',
    title: 'What Is an Algorithm?',
    concept: 'Same problem, different speeds',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 10,
    theory: {
      analogy: {
        title: 'The higher-or-lower game',
        body: "A game-show host hides a price between $1 and $1,000. After every guess she says only 'higher' or 'lower'. One contestant guesses $1, $2, $3... and may need a thousand guesses. Another guesses $500, hears 'lower', and has just thrown away half the possibilities with one guess. Same game, same contestant brain, wildly different amount of work. The difference is the algorithm.",
      },
      keyTerms: [
        { term: 'Algorithm', definition: 'A precise set of steps for accomplishing a task. Two algorithms can solve the same problem with very different amounts of work.' },
        { term: 'Simple search', definition: 'Check every candidate one by one, in order. Also called linear search.' },
        { term: 'Binary search', definition: 'Check the middle of a sorted range, then discard the half that cannot contain the answer. Repeat.' },
        { term: 'Sorted input', definition: "Binary search's one requirement: 'too high / too low' only tells you which half to drop when the items are in order." },
      ],
      walkthrough: [
        {
          label: 'One at a time',
          code: 'guesses: 1, 2, 3, 4, 5, ...',
          explanation: 'Each guess rules out exactly one price. If the answer is $987, that is 987 guesses. Worst case: 1,000.',
        },
        {
          label: 'Halve the range',
          code: 'guess 500 -> "lower"   (501..1000 are gone)\nguess 250 -> "higher"  (1..250 are gone)\nguess 375 -> "lower"   (375..499 are gone)',
          explanation: 'Every answer eliminates half of what is left: 1,000 -> 500 -> 250 -> 125 -> ...',
        },
        {
          label: 'Count the halvings',
          code: '1000 -> 500 -> 250 -> 125 -> 63 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1',
          explanation: 'Ten halvings take 1,000 candidates down to one. Binary search never needs more than about 10 guesses here, no matter what the hidden price is.',
        },
        {
          label: 'The catch',
          explanation: "Halving only works because prices are ordered. If the host answered just 'wrong' instead of 'higher/lower', you would be back to guessing one at a time.",
        },
      ],
      memoryTip: 'Same problem, same computer: 1,000 steps or 10. The algorithm is the speedup.',
    },
    prompt: 'Read the walkthrough. In the next two lessons you will write both strategies in Python and watch the difference.',
  },

  {
    id: 'flame4-2',
    title: 'Simple Search',
    concept: 'Linear search',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 20,
    theory: {
      analogy: {
        title: 'Checking every pocket',
        body: 'You have lost your keys somewhere in a coat with twelve pockets. With no clue where they are, you pat down pocket 1, then pocket 2, then pocket 3. You stop the moment you feel them. If they are in the last pocket, or not in the coat at all, you check all twelve.',
      },
      keyTerms: [
        { term: 'Index', definition: 'The position of an item in a list. Python counts from 0, so the first item is at index 0.' },
        { term: 'Linear search', definition: 'Visit each index in order until the target turns up or the list runs out.' },
        { term: 'None', definition: "Python's 'no value'. A search function returns None to say 'not found'." },
      ],
      walkthrough: [
        {
          label: 'Visit every index',
          code: 'for i in range(len(items)):\n    print(i, items[i])',
          explanation: 'range(len(items)) produces 0, 1, 2, ... up to the last index. items[i] reads the item stored there.',
        },
        {
          label: 'Stop when you find it',
          code: 'if items[i] == target:\n    return i',
          explanation: 'return ends the function immediately, so later positions are never checked.',
        },
        {
          label: 'Fell off the end',
          code: 'return None',
          explanation: 'If the loop finishes without returning, the target is not in the list.',
        },
      ],
      memoryTip: 'Linear search does work proportional to the list length: 10 items, up to 10 checks; a million items, up to a million checks.',
    },
    prompt: 'Write `linear_search(items, target)`. Return the index of the first item equal to `target`, or `None` if it is not in the list.',
    explanation: [
      'This is your first code exercise. Press **Run Tests** (or ⌘↵) and each test calls your function and compares the result.',
      'Anything you `print()` shows up next to the test results, so use it freely to see what your code is doing.',
    ].join('\n\n'),
    hint: 'Loop with `for i in range(len(items))`, compare `items[i]` to `target`, and `return i` on a match. After the loop, `return None`.',
    starterCode: `def linear_search(items, target):
    # Check each position in order.
    # Return the index where target lives, or None if it is not there.
    pass
`,
    tests: [
      { call: 'linear_search([4, 8, 15, 16, 23, 42], 15)', expected: '2' },
      { call: 'linear_search([4, 8, 15, 16, 23, 42], 4)', expected: '0' },
      { call: 'linear_search([4, 8, 15, 16, 23, 42], 42)', expected: '5' },
      { call: 'linear_search([4, 8, 15, 16, 23, 42], 7)', expected: 'None' },
      { call: 'linear_search(["ash", "oak", "elm"], "elm")', expected: '2' },
      { call: 'linear_search([7, 3, 7], 7)', expected: '0' },
      { call: 'linear_search([], 1)', expected: 'None' },
    ],
    forbidden: [
      { pattern: '\\.index\\s*\\(', message: 'Write the loop yourself. No .index() in this lesson.' },
    ],
    solutionCode: `def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
    return None
`,
    complexity: 'O(n) time · O(1) extra space',
    solutionExplanation: 'The loop touches each position at most once and returns as soon as it finds a match, which is why the first of two equal items wins. In the worst case (target last, or missing) it looks at all n items.',
  },

  {
    id: 'flame4-3',
    title: 'Binary Search',
    concept: 'Halving a sorted list',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 30,
    theory: {
      analogy: {
        title: 'Finding a page number',
        body: 'To open a 600-page book at page 431 you do not turn pages one at a time. You open it near the middle, see 290, and know everything before that is useless. You split the remaining chunk, see 470, and discard everything after it. A few splits and you are there. The page numbers being in order is what makes each split informative.',
      },
      keyTerms: [
        { term: 'low / high', definition: 'The first and last index of the part of the list that could still contain the target.' },
        { term: 'mid', definition: 'The middle index of the current range: (low + high) // 2. The // operator divides and rounds down.' },
        { term: 'Search space', definition: 'Everything between low and high. Each step cuts it in half.' },
      ],
      walkthrough: [
        {
          label: 'Start with the whole list',
          code: 'low = 0\nhigh = len(items) - 1',
          explanation: 'The target, if present, is somewhere between these two indexes.',
        },
        {
          label: 'Look at the middle',
          code: 'mid = (low + high) // 2\nguess = items[mid]',
          explanation: 'One read tells you which half to keep.',
        },
        {
          label: 'Discard a half',
          code: 'guess too high -> high = mid - 1\nguess too low  -> low = mid + 1',
          explanation: 'mid itself has been checked, so the new range starts just past it. Forgetting the +1 / -1 is the classic infinite-loop bug.',
        },
        {
          label: 'Know when to stop',
          code: 'while low <= high:',
          explanation: 'When low passes high the range is empty: the target is not in the list.',
        },
      ],
      memoryTip: 'Three moving parts: low, high, mid. Check mid, then move low or high PAST mid.',
    },
    prompt: 'Write `binary_search(items, target)` for a **sorted** list. Return the index of `target`, or `None` if it is missing.',
    explanation: 'The last two tests hand your function a 1,000-item list that counts how many items you read. Binary search needs about 10 looks. A scan from the front needs hundreds and will fail them.',
    hint: 'Inside `while low <= high:` compute `mid`, read `guess = items[mid]`, then return `mid`, or set `high = mid - 1`, or set `low = mid + 1`.',
    setupCode: PROBE,
    starterCode: `def binary_search(items, target):
    low = 0
    high = len(items) - 1

    # While there is still a range to search:
    #   look at the middle item
    #   found it?  return its index
    #   too high?  move high just below mid
    #   too low?   move low just above mid

    return None
`,
    tests: [
      { call: 'binary_search([1, 3, 5, 7, 9], 7)', expected: '3' },
      { call: 'binary_search([1, 3, 5, 7, 9], 1)', expected: '0' },
      { call: 'binary_search([1, 3, 5, 7, 9], 9)', expected: '4' },
      { call: 'binary_search([1, 3, 5, 7, 9], 4)', expected: 'None' },
      { call: 'binary_search([10], 10)', expected: '0' },
      { call: 'binary_search([], 3)', expected: 'None' },
      { call: 'binary_search(list(range(0, 2000, 2)), 1338)', expected: '669' },
      { name: '1,000 items, target is last: at most 30 reads', call: 'check_reads(binary_search, 1000, 1998, 30)', expected: "'ok'" },
      { name: '1,000 items, target missing: at most 30 reads', call: 'check_reads(binary_search, 1000, 777, 30)', expected: "'ok'" },
    ],
    solutionCode: `def binary_search(items, target):
    low = 0
    high = len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = items[mid]
        if guess == target:
            return mid
        if guess > target:
            high = mid - 1
        else:
            low = mid + 1

    return None
`,
    complexity: 'O(log n) time · O(1) extra space',
    solutionExplanation: 'Every pass through the loop halves the range between low and high, so a 1,000-item list is exhausted in about 10 passes. Moving low and high past mid guarantees the range shrinks every time, which is what makes the loop end.',
  },

  {
    id: 'flame4-4',
    title: 'How Many Steps?',
    concept: 'Logarithms',
    difficulty: 'kindling',
    exerciseType: 'quiz',
    xpReward: 15,
    theory: {
      analogy: {
        title: 'Cutting a rope in half',
        body: 'Take a rope 1,024 cm long and keep cutting it in half: 512, 256, 128... After only ten cuts you are holding 1 cm. A logarithm is just that count: how many times can you halve a number before you reach 1?',
      },
      keyTerms: [
        { term: 'log₂ n', definition: 'The number of times n can be halved before reaching 1. Equivalently, the power you raise 2 to in order to get n.' },
        { term: 'Linear time', definition: 'Work grows in step with the input: twice the items, twice the work. Simple search.' },
        { term: 'Logarithmic time', definition: 'Work grows by one step each time the input doubles. Binary search.' },
      ],
      walkthrough: [
        {
          label: 'Logs undo powers',
          code: '2 x 2 x 2 = 8          so  log2(8) = 3\n2^10      = 1,024      so  log2(1,024) = 10',
          explanation: 'Exponents ask "what do I get after doubling k times?" Logs ask "how many doublings got me here?"',
        },
        {
          label: 'Binary search halves, so it takes log₂ n steps',
          code: 'n = 8:          8 -> 4 -> 2 -> 1            (3 halvings)\nn = 1,024:      10 halvings\nn = 1,000,000:  about 20 halvings',
          explanation: 'In practice add one more look for the final item, but the growth pattern is what matters.',
        },
        {
          label: 'Doubling the input costs one step',
          code: 'n = 1,024  -> 10 steps\nn = 2,048  -> 11 steps\nn = 4,096  -> 12 steps',
          explanation: 'This is why logarithmic algorithms feel almost free at scale: 4 billion items is still only about 32 steps.',
        },
      ],
      memoryTip: 'When you see "log n", read it as "how many times can I cut n in half?"',
    },
    quiz: [
      {
        question: 'A sorted list holds 256 names. Roughly how many times can binary search halve it before only one name is left?',
        options: ['About 8', 'About 16', '128', '256'],
        answer: 0,
        explanation: '2⁸ = 256, so log₂ 256 = 8. Give or take one final check, that is the worst case.',
      },
      {
        question: 'The list doubles to 512 names. What happens to the worst-case number of halvings?',
        options: ['It doubles to about 16', 'It goes up by one, to about 9', 'It stays at 8', 'It becomes 512'],
        answer: 1,
        explanation: 'Doubling the input adds a single halving. That is the signature of logarithmic growth.',
      },
      {
        question: 'A sorted list has 1,000,000 items. In the worst case, about how many items does each algorithm look at?',
        options: [
          'Simple search: 500,000 · Binary search: about 1,000',
          'Simple search: 1,000,000 · Binary search: about 500,000',
          'Simple search: 1,000,000 · Binary search: about 20',
          'Both about 20',
        ],
        answer: 2,
        explanation: 'Simple search may have to visit every item. Binary search halves a million down to one in about 20 steps (2²⁰ ≈ 1,000,000).',
      },
      {
        question: 'Why does binary search need the list to be sorted?',
        options: [
          'Python cannot index into unsorted lists',
          'Sorted lists use less memory',
          'It does not: binary search works on any list',
          'Because "too high" or "too low" only tells you which half to discard when the items are in order',
        ],
        answer: 3,
        explanation: 'In an unsorted list, seeing a 50 in the middle tells you nothing about where 30 might be. The ordering is what lets one look rule out half the list.',
      },
    ],
  },

  {
    id: 'flame4-5',
    title: 'Big O Notation',
    concept: 'Measuring growth, not seconds',
    difficulty: 'kindling',
    exerciseType: 'quiz',
    xpReward: 15,
    theory: {
      analogy: {
        title: 'Hosting a dinner for n guests',
        body: 'Lighting one candle for the table is the same work whether 4 or 40 people come. Setting a plate per guest grows in step with the guest list. Having every guest clink glasses with every other guest explodes: 4 guests make 6 clinks, 40 guests make 780. Big O is the vocabulary for these shapes. It does not say how many minutes dinner takes; it says how the work grows as the guest list does.',
      },
      keyTerms: [
        { term: 'Big O', definition: 'A label for how the number of operations grows as the input size n grows.' },
        { term: 'Worst case', definition: 'Big O normally describes the slowest scenario, so it works as a guarantee: it will never be worse than this.' },
        { term: 'Constant factor', definition: 'A fixed multiplier such as the 2 in 2n or the 1/26 in n/26. Big O ignores it, because it does not change the shape of the growth.' },
      ],
      walkthrough: [
        {
          label: 'Seconds mislead',
          code: 'check = 1 ms         simple search   binary search\n100 items                 100 ms            7 ms\n1,000,000,000 items      11.6 days         30 ms',
          explanation: 'On 100 items binary search looks "15 times faster". On a billion it is tens of millions of times faster. A single timing tells you nothing about how the gap grows.',
        },
        {
          label: 'So count operations as a function of n',
          code: 'simple search:  up to n checks      -> O(n)\nbinary search:  up to log n checks  -> O(log n)',
          explanation: 'n is the size of the input. The expression inside O( ) is how the work scales with it.',
        },
        {
          label: 'Big O is a worst-case promise',
          explanation: 'If simple search finds its target in the first slot, that run was lucky; the algorithm is still O(n), because nothing stops the target from being last next time.',
        },
        {
          label: 'Drop the constants',
          code: 'O(n / 26) -> O(n)      O(2n) -> O(n)      O(n + 5) -> O(n)',
          explanation: 'Reading 1/26th of a list is still work that doubles when the list doubles.',
        },
        {
          label: 'The usual suspects, fastest to slowest',
          code: 'O(1)        constant       grab one array item\nO(log n)    logarithmic    binary search\nO(n)        linear         simple search\nO(n log n)  log-linear     a fast sort (quicksort)\nO(n^2)      quadratic      a slow sort (selection sort)\nO(n!)       factorial      trying every ordering',
          explanation: 'You will meet every one of these in this track.',
        },
      ],
      memoryTip: 'Big O answers one question: if the input gets 10 times bigger, how much more work is it?',
    },
    quiz: [
      {
        question: 'A library catalog is sorted by title. You have a title and want its shelf number. What is the best running time you can get?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 1,
        explanation: 'The catalog is sorted by the thing you are looking up, so binary search applies: O(log n).',
      },
      {
        question: 'Same catalog, still sorted by title. This time you have a shelf number and want to know which title sits there.',
        options: ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'],
        answer: 2,
        explanation: 'The catalog is not ordered by shelf number, so the halving trick is useless. You have to scan entries one by one: O(n).',
      },
      {
        question: 'You read out only the titles that start with "A", roughly 1/26th of the catalog. What is the running time?',
        options: ['O(n / 26)', 'O(26)', 'O(log n)', 'O(n)'],
        answer: 3,
        explanation: 'n/26 still doubles when the catalog doubles. Big O drops constant factors, so this is O(n).',
      },
      {
        question: 'Simple search happens to find its target in the very first slot. What is the Big O of simple search?',
        options: ['Still O(n)', 'O(1), because it took one step', 'O(log n)', 'It depends on the run'],
        answer: 0,
        explanation: 'One lucky run is the best case. Big O describes the worst case, and in the worst case simple search reads every item.',
      },
      {
        question: 'A delivery planner finds the shortest route through n stops by trying every possible ordering of the stops. How does the work grow?',
        options: ['O(n)', 'O(n²)', 'O(n!)', 'O(log n)'],
        answer: 2,
        explanation: 'There are n! orderings: 5 stops give 120, 10 stops give 3,628,800, and 20 stops give more than two quintillion. This is the traveling salesperson problem, and no fast exact algorithm for it is known.',
      },
    ],
  },

  {
    id: 'flame4-6',
    title: 'Trial: The Insert Position',
    concept: 'Binary search, adapted',
    difficulty: 'kindling',
    exerciseType: 'code',
    xpReward: 50,
    theory: {
      analogy: {
        title: 'Shelving a returned book',
        body: 'A librarian reshelving a book does not care whether another copy is already there. She needs the exact gap on the shelf where it belongs so the shelf stays in order. She finds that gap the same way she would find the book itself: by halving.',
      },
      keyTerms: [
        { term: 'Insertion point', definition: 'The index where a value would have to be inserted to keep a sorted list sorted.' },
        { term: 'Invariant', definition: 'A fact that stays true on every pass of a loop. Here: everything left of low is smaller than the target, everything right of high is larger.' },
      ],
      walkthrough: [
        {
          label: 'Same loop, new question',
          explanation: 'Run binary search exactly as before. If you land on the target, its index is the answer.',
        },
        {
          label: 'Where does the loop leave you?',
          code: 'items = [10, 20, 30, 40], target = 25\nlow=0 high=3 -> mid=1 (20, too low)  -> low=2\nlow=2 high=3 -> mid=2 (30, too high) -> high=1\nlow=2 high=1 -> stop',
          explanation: 'The loop ends with low sitting on the first item bigger than the target. That is exactly where 25 belongs.',
        },
        {
          label: 'Trust the invariant',
          explanation: 'Because everything left of low is smaller than the target at all times, low is the insertion point when the search runs out. The edge cases (empty list, smaller than everything, bigger than everything) fall out of the same rule.',
        },
      ],
      memoryTip: 'When binary search fails, low has not wandered off: it is pointing at the gap.',
    },
    prompt: 'Write `search_insert(items, target)` for a sorted list of distinct numbers. Return the index of `target` if it is present. Otherwise return the index where it would be inserted to keep the list sorted.',
    explanation: 'No starter code this time. Your solution must stay logarithmic: the last test counts reads on a 1,000-item list.',
    hint: 'Write your binary search loop from the previous lesson. The only change is what you return when the loop ends without a match.',
    setupCode: PROBE,
    starterCode: `def search_insert(items, target):
    pass
`,
    tests: [
      { call: 'search_insert([10, 20, 30, 40], 30)', expected: '2' },
      { call: 'search_insert([10, 20, 30, 40], 25)', expected: '2' },
      { call: 'search_insert([10, 20, 30, 40], 5)', expected: '0' },
      { call: 'search_insert([10, 20, 30, 40], 99)', expected: '4' },
      { call: 'search_insert([10], 10)', expected: '0' },
      { call: 'search_insert([], 7)', expected: '0' },
      { name: '1,000 items, target not present: at most 30 reads', call: 'check_reads(search_insert, 1000, 1001, 30)', expected: "'ok'" },
    ],
    forbidden: [
      { pattern: '\\bbisect\\b', message: 'No bisect module here. That is exactly what you are building.' },
    ],
    solutionCode: `def search_insert(items, target):
    low = 0
    high = len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return low
`,
    complexity: 'O(log n) time · O(1) extra space',
    solutionExplanation: 'The loop is ordinary binary search. Each time it moves low, everything to the left of the new low is known to be smaller than the target; each time it moves high, everything to its right is known to be larger. When the two cross, low is the first position holding something larger, which is the insertion point.',
  },
]
