# utils/encryption.py

from cryptography.fernet import Fernet

# Generate and store this key securely; it's critical for encryption/decryption
# In a real application, this key should be stored in an environment variable or secure storage
key = Fernet.generate_key()
cipher_suite = Fernet(key)

def encrypt_file(file_path):
    with open(file_path, 'rb') as file:
        file_data = file.read()
        encrypted_data = cipher_suite.encrypt(file_data)
    
    with open(file_path, 'wb') as file:
        file.write(encrypted_data)

def decrypt_file(file_path):
    with open(file_path, 'rb') as file:
        encrypted_data = file.read()
        decrypted_data = cipher_suite.decrypt(encrypted_data)
    
    with open(file_path, 'wb') as file:
        file.write(decrypted_data)
