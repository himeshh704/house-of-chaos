from PIL import Image

def remove_black_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Calculate brightness / threshold for dark black background
        brightness = max(r, g, b)
        if brightness < 35:
            # Completely black or very dark background -> transparent
            new_data.append((r, g, b, 0))
        elif brightness < 80:
            # Smooth feathering edge for anti-aliasing
            alpha = int((brightness - 35) / 45.0 * 255)
            new_data.append((r, g, b, alpha))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_black_background("assets/logo.png", "assets/logo.png")
    print("Successfully removed black box background from logo.png!")
