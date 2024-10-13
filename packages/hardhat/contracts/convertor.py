import sys

def convert_to_small_unit(amount, decimals=6):
    """
    Converts a big unit (e.g., 1.5 ETH) to its smaller unit (e.g., Wei).
    :param amount: The amount in the main (big) unit.
    :param decimals: The number of decimals for the small unit.
    :return: The amount in small units.
    """
    small_unit = amount * (10 ** decimals)
    return int(small_unit)

def convert_to_big_unit(amount, decimals=6):
    """
    Converts a small unit (e.g., Wei) to its larger unit (e.g., ETH).
    :param amount: The amount in the small unit.
    :param decimals: The number of decimals for the small unit.
    :return: The amount in big units.
    """
    big_unit = amount / (10 ** decimals)
    return big_unit

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        # First argument: Conversion type (bts or stb)
        conversion_type = sys.argv[1].lower()
        amount = float(sys.argv[2])  # Second argument: The amount to convert
        decimals = int(sys.argv[3])  # Third argument: The number of decimals (optional)

        if conversion_type == "bts":
            # Convert big to small (e.g., ETH to Wei)
            amount_in_small_unit = convert_to_small_unit(amount, decimals)
            print(f"{amount} in small units is: {amount_in_small_unit}")
        
        elif conversion_type == "stb":
            # Convert small to big (e.g., Wei to ETH)
            amount_in_big_unit = convert_to_big_unit(amount, decimals)
            print(f"{amount} in big units is: {amount_in_big_unit}")
        
        else:
            print("Invalid conversion type! Use 'bts' for big to small or 'stb' for small to big.")
    
    elif len(sys.argv) == 3:
        # If the user does not provide the number of decimals, default to 6 decimals
        conversion_type = sys.argv[1].lower()
        amount = float(sys.argv[2])
        decimals = 6  # Default value if not specified

        if conversion_type == "bts":
            amount_in_small_unit = convert_to_small_unit(amount, decimals)
            print(f"{amount} in small units is: {amount_in_small_unit}")
        
        elif conversion_type == "stb":
            amount_in_big_unit = convert_to_big_unit(amount, decimals)
            print(f"{amount} in big units is: {amount_in_big_unit}")
        
        else:
            print("Invalid conversion type! Use 'bts' for big to small or 'stb' for small to big.")
    
    else:
        print("Usage: python3 convertor.py <bts|stb> <amount> [decimals]")
        print("Example: python3 convertor.py bts 1.5 18")
        print("Example: python3 convertor.py stb 1500000 6")

