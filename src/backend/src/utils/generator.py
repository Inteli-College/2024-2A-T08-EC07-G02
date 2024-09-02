import secrets


class Generator:
    @staticmethod
    def generate_api_key():
        return f"presgen-{secrets.token_hex(4)}-{secrets.token_hex(4)}-{secrets.token_hex(4)}-{secrets.token_hex(8)}"


if __name__ == "__main__":
    print(Generator.generate_api_key())
