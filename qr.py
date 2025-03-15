import qrcode

# URL of your website
url = "http://127.0.0.1:5500/sample.html"  # Replace with your actual website URL

# Generate QR code
qr = qrcode.QRCode(
    version=1,  # Controls the size of the QR code (1 is the smallest)
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # Error correction level
    box_size=10,  # Size of each box in the QR code
    border=4,  # Border size (in boxes)
)

# Add data to the QR code
qr.add_data(url)
qr.make(fit=True)

# Create an image from the QR code
img = qr.make_image(fill_color="black", back_color="white")

# Save the image
img.save("ecopure_qr_code.png")
print("QR code generated and saved as 'ecopure_qr_code.png'")