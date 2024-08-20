from cryptography.fernet import Fernet

# Generate and store this key securely; it's critical for encryption/decryption
# In a real application, this key should be stored in an environment variable or secure storage
key = Fernet.generate_key()
cipher_suite = Fernet(key)  # Create a cipher suite using the generated key

def encrypt_file(file_path):
    """
    Encrypts the contents of a file.

    Args:
        file_path (str): The path to the file to be encrypted.
    """
    # Open the file in binary read mode
    with open(file_path, 'rb') as file:
        file_data = file.read()  # Read the file's data
        encrypted_data = cipher_suite.encrypt(file_data)  # Encrypt the data
    
    # Open the file in binary write mode and overwrite it with encrypted data
    with open(file_path, 'wb') as file:
        file.write(encrypted_data)  # Write the encrypted data back to the file

def decrypt_file(file_path):
    """
    Decrypts the contents of a file.

    Args:
        file_path (str): The path to the file to be decrypted.
    """
    # Open the file in binary read mode
    with open(file_path, 'rb') as file:
        encrypted_data = file.read()  # Read the encrypted data
        decrypted_data = cipher_suite.decrypt(encrypted_data)  # Decrypt the data
    
    # Open the file in binary write mode and overwrite it with decrypted data
    with open(file_path, 'wb') as file:
        file.write(decrypted_data)  # Write the decrypted data back to the file
