import { Book } from "@/models/Book";
import { FacebookOutlined, ShareAltOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Helper from "@/libs/helper";
import { Modal } from "antd";
type Props = {
  bookItem: Book;
};
const BookItem: React.FC<Props> = ({ bookItem }) => {
  const defaultImage = "https://i.ibb.co/Xb5fZNJ/default-book-image.jpg";
  const bookCoverId = bookItem.cover_id ?? bookItem.cover_i;
  const imageUrl = bookCoverId
    ? `${import.meta.env.VITE_COVER_API}/id/${bookCoverId}-L.jpg`
    : defaultImage;
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClickShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    showModal();
  };
  const handleClickBookItem = () => {
    navigate(getUrlToBookItem());
  };
  const getUrlToBookItem = (): string => {
    const authorName = Helper.transferSearchAuthorNameData(getAuthorName());
    const bookId = Helper.getBookId(bookItem.key);
    const nextPage = Helper.gotoBookItemDetailPage(bookId, authorName);
    return nextPage;
  };
  const getAuthorName = () => {
    return bookItem.authors
      ? bookItem.authors[0].name
      : bookItem.author_name
        ? bookItem.author_name[0]
        : "";
  };
  const handleShareWithFB = () => {
    const origin = window.location.origin;
    const toBookItem = getUrlToBookItem();
    const fullUrl = `${origin}${toBookItem}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      "_blank"
    );
  };
  return (
    <>
      <Modal
        title="Share this book"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <button onClick={handleShareWithFB}>
          <FacebookOutlined className="text-blue-700 text-[35px]" />
        </button>
      </Modal>
      <div
        className="relative w-[var(--book-item-width)]"
        onClick={handleClickBookItem}
      >
        <div className="group p-[15%] w-full bg-[var(--book-item-background-color)] hover:cursor-pointer relative">
          <div className="w-full h-full absolute top-0 left-0 bg-[var(--book-item-background-wrapper-color)] opacity-0 group-hover:opacity-100"></div>
          <div className="relative inline-block w-full h-[var(--book-item-image-height)]">
            {!imageLoaded && (
              <div className="absolute inset-0 flex justify-center items-center">
                <LoadingOutlined className="text-yellow-400 animate-spin " />
              </div>
            )}
            <img
              loading="lazy"
              className="static shadow-2xl w-full h-full object-cover"
              src={imageUrl}
              alt="book-page"
              onLoad={handleImageLoad}
            />
          </div>
          <button
            className="absolute bg-[var(--book-item-share-background-color)] rounded-bl-xl top-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            onClick={handleClickShare}
          >
            <ShareAltOutlined className="text-[35px] text-[var(--accent-color)]" />
          </button>
        </div>
        <div className="flex flex-col items-center pt-1 hover:cursor-pointer">
          <h2 className="text-center text-[22px] font-bold">
            {bookItem.title}
          </h2>
          <div className="flex items-center opacity-75">
            <span className="text-[12px] mr-1">by</span>
            <h4>{getAuthorName()}</h4>
          </div>
          <label className="text-[10px]">
            since{" "}
            <span className="text-black font-bold">
              {bookItem.first_publish_year}
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default BookItem;
