import os

def load_input(file):
    with open(file, "r") as lines:
        return [int(line) for line in lines]

def get_increases(measurements):
    count = 0

    for i in range(1, len(measurements)):
        if measurements[i] > measurements[i-1]:
            count += 1
    
    return count

def main():
    file_name = os.path.join(os.path.dirname(__file__), "input")

    input = load_input(file_name)
    count = get_increases(input)

    print(count)

if __name__ == "__main__":
    main()
    