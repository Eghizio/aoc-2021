import os

def load_input(file):
    with open(file, "r") as lines:
        return [int(line) for line in lines]

def get_window_sums(data, window_size=3):
    sums = []

    for i in range(len(data)):
        window = data[i:i+window_size]
        if len(window) is window_size:
            sums.append(sum(window))
    
    return sums
            
def get_increases(measurements):
    count = 0

    for i in range(1, len(measurements)):
        if measurements[i] > measurements[i-1]:
            count += 1
    
    return count

def main():
    file_name = os.path.join(os.path.dirname(__file__), "input")

    input = load_input(file_name)
    window_sums = get_window_sums(input, 3)
    count = get_increases(window_sums)

    print(count)

if __name__ == '__main__':
    main()
    