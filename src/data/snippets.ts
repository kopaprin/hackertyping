import { Snippet } from '../state/types'

export const snippets: Snippet[] = [
  {
    id: 'bubble-sort',
    title: 'bubble_sort.py',
    topic: 'algorithm',
    code: `def bubble_sort(items):
    n = len(items)
    for i in range(n):
        for j in range(0, n - i - 1):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
    return items
`,
  },
  {
    id: 'fibonacci-recursive',
    title: 'fibonacci.py',
    topic: 'recursion',
    code: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]
`,
  },
  {
    id: 'retry-decorator',
    title: 'retry_decorator.py',
    topic: 'decorator',
    code: `import time

def retry(times=3, delay=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as error:
                    print(f"Attempt {attempt + 1} failed: {error}")
                    time.sleep(delay)
            raise RuntimeError("All retry attempts failed")
        return wrapper
    return decorator
`,
  },
  {
    id: 'person-class',
    title: 'person_class.py',
    topic: 'class',
    code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, my name is {self.name} and I'm {self.age} years old"

    def have_birthday(self):
        self.age += 1
        return f"Happy birthday! Now {self.age} years old"
`,
  },
  {
    id: 'list-comprehension',
    title: 'list_comprehension.py',
    topic: 'list-comprehension',
    code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

squares = [x ** 2 for x in numbers]

evens = [x for x in numbers if x % 2 == 0]

pairs = [(x, x ** 2) for x in numbers if x % 3 == 0]
`,
  },
  {
    id: 'file-io',
    title: 'file_io.py',
    topic: 'file-io',
    code: `def read_and_process_file(filename):
    try:
        with open(filename, 'r') as f:
            lines = f.readlines()
        processed = [line.strip().upper() for line in lines]
        with open('output.txt', 'w') as f:
            f.writelines(processed)
        return len(processed)
    except FileNotFoundError:
        print(f"File {filename} not found")
        return 0
`,
  },
  {
    id: 'cli-script',
    title: 'calculator.py',
    topic: 'script',
    code: `import sys

def calculate(a, b, operation):
    if operation == 'add':
        return a + b
    elif operation == 'sub':
        return a - b
    elif operation == 'mul':
        return a * b
    elif operation == 'div':
        return a / b if b != 0 else None

if __name__ == '__main__':
    result = calculate(10, 5, 'add')
    print(f"Result: {result}")
`,
  },
  {
    id: 'dict-comprehension',
    title: 'dict_comprehension.py',
    topic: 'list-comprehension',
    code: `words = ['apple', 'banana', 'cherry', 'date']

word_lengths = {word: len(word) for word in words}

inverted = {v: k for k, v in word_lengths.items()}

pairs = {i: v for i, v in enumerate(words)}
`,
  },
  {
    id: 'generator-function',
    title: 'generator.py',
    topic: 'recursion',
    code: `def number_generator(start, end):
    current = start
    while current < end:
        yield current
        current += 1

def infinite_counter():
    count = 0
    while True:
        yield count
        count += 1

for num in number_generator(1, 5):
    print(num)
`,
  },
  {
    id: 'linked-list',
    title: 'linked_list.py',
    topic: 'class',
    code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        return ' -> '.join(elements)
`,
  },
]
