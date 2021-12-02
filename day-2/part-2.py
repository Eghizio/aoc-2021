
def load_input(file):
    with open(file, "r") as lines:
        return [line for line in lines]

def execute_move(move, step, position):
    delta = {}

    if move == "forward": delta = { "horizontal": step, "depth": step*position["aim"] }
    if move == "down": delta = { "aim": step }
    if move == "up": delta = { "aim": -step }

    for key, val in delta.items():
        position[key] += val
    
    return position

def perform_moves(data):
    position = {
        "horizontal": 0,
        "depth": 0,
        "aim": 0
    }

    for line in data:
        move, step = line.split(" ")
        position = execute_move(move, int(step), position)
        
    return position

def main():
    input = load_input("input")

    final_position = perform_moves(input)
    result = final_position["horizontal"] * final_position["depth"]
    
    print(result)

if __name__ == "__main__":
    main()
    