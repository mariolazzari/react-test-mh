import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should not render in no image urls", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();

    // const ul = screen.queryByRole("list");
    // expect(ul).not.toBeInTheDocument();
  });

  it("should not render images", () => {
    const imgUrls = ["img1", "img2"];
    render(<ProductImageGallery imageUrls={imgUrls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(images.length);

    imgUrls.forEach((url, idx) => {
      expect(images[idx]).toHaveAttribute("src", url);
    });
  });
});
