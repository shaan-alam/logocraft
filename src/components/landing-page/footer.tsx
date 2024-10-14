import Image from "next/image";

const Footer = () => {
  return (
    <footer className="container mx-auto mt-auto flex justify-between border-t border-default-300 p-4">
      <p className="flex items-center space-x-2 text-default-500">
        <span>Created By</span>
        <a
          href="https://x.com/shaancodes_"
          rel="noreferrer"
          target="_blank"
          className="flex items-center space-x-1 transition-all hover:underline"
        >
          <span>
            <Image
              height={24}
              width={24}
              alt="Shaan Alam"
              src="https://utfs.io/f/4HrWTRZRvKfTYmrI1n3yRK7IoaJmUPlSqnVfiZt2dFgHBpwz"
              className="rounded-full"
            />
          </span>
          <span>Shaan Alam</span>
        </a>
        <span>with ❤️</span>
      </p>
      <a
        href="https://crotus.io/shaanalam/review"
        className="text-default-500 underline"
        target="_blank"
        rel="noreferrer"
      >
        Leave a Review
      </a>
    </footer>
  );
};

export default Footer;
