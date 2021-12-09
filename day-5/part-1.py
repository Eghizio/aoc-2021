
def load_input(file):
    with open(file, "r") as lines:
        return [line for line in lines]

def get_lines(data):
    return [[list(map(int, point.strip().split(","))) for point in row.split("->")] for row in data]
    
def filter_straight(lines):
    def is_straight(line):
        p1, p2 = line
        x1, y1 = p1
        x2, y2 = p2
        return x1 is x2 or y1 is y2
    return list(filter(is_straight, lines))

# const getLinePoints = ([p1, p2]: Line) => {
#     const [left, right] = p1.x < p2.x ? [p1, p2] : [p2, p1];
#     const isVertical = left.x === right.x;
#     const length = isVertical ? Math.abs(right.y - left.y) + 1 : right.x - left.x + 1;

#     return Array.from({ length }, (_, i) => isVertical
#         ? { x: left.x,     y: left.y + i }
#         : { x: left.x + i, y: left.y     }
#     );
# };

def get_line_points(line):
    p1, p2 = line
    x1, y1 = p1
    x2, y2 = p2
    left, right = (p1, p2) if x1 < x2 else (p2, p1)
    print(left, right)

def main():
    input = load_input("input")

    lines = get_lines(input)
    lines = filter_straight(lines)
    
    print(len(lines))

    sample_line = lines[0]
    print(sample_line)
    print(get_line_points(sample_line))

if __name__ == "__main__":
    main()
    