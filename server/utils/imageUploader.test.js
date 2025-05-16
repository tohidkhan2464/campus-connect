const { uploadImageToCloudinary } = require("./imageUploader");
const cloudinary = require("cloudinary").v2;

jest.mock("cloudinary");

describe("uploadImageToCloudinary", () => {
  it("should upload an image with the correct options", async () => {
    const mockFile = { tempFilePath: "path/to/temp/file" };
    const mockResponse = { url: "http://example.com/image.jpg" };
    cloudinary.uploader.upload.mockResolvedValue(mockResponse);

    const result = await uploadImageToCloudinary(mockFile, "test-folder", 500, 80);

    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(mockFile.tempFilePath, {
      folder: "test-folder",
      height: 500,
      quality: 80,
      resource_type: "auto",
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if upload fails", async () => {
    const mockFile = { tempFilePath: "path/to/temp/file" };
    cloudinary.uploader.upload.mockRejectedValue(new Error("Upload failed"));

    await expect(uploadImageToCloudinary(mockFile, "test-folder")).rejects.toThrow("Upload failed");
  });

  it("should throw an error if the file does not have a tempFilePath", async () => {
    const invalidFile = {}; // Missing tempFilePath

    await expect(uploadImageToCloudinary(invalidFile, "test-folder")).rejects.toThrow(
      "Invalid file input"
    );
  });
});
