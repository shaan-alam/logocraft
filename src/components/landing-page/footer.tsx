import Image from "next/image";

import ReportBugModal from "../report-bug-modal";

export default function Footer() {
  return (
    <footer className="container mx-auto mt-auto border-t border-default-300 p-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
        <p className="flex items-center justify-center space-x-2 text-default-500 sm:flex-row sm:space-y-0">
          <span>Created By</span>
          <a
            href="https://x.com/shaancodes_"
            rel="noreferrer"
            target="_blank"
            className="flex items-center space-x-1 transition-all hover:underline"
          >
            <Image
              height={24}
              width={24}
              alt="Shaan Alam"
              src="https://utfs.io/f/4HrWTRZRvKfTYmrI1n3yRK7IoaJmUPlSqnVfiZt2dFgHBpwz"
              className="rounded-full"
            />
            <span>Shaan Alam</span>
          </a>
          <span className="sm:inline">with ❤️</span>
        </p>
        <div className="flex justify-center space-x-4 sm:justify-end">
          <a
            href="https://crotus.io/shaanalam/review"
            className="text-default-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Leave a Review
          </a>
          <ReportBugModal />
        </div>
      </div>
      <div className="my-4 text-center">
        <p className="text-sm text-default-500 leading-7">
          The AI models used in LogoCraft, including any AI-generated outputs,
          are intended for lawful and ethical use only. We strictly prohibit the
          use of our product for generating content that infringes upon
          copyright, violates intellectual property rights, or creates any adult
          content. Any misuse of our product in violation of these terms may
          result in the immediate suspension of service. Menubar AI is committed
          to upholding the highest standards of legal and ethical compliance. By
          using our services, you agree to abide by our terms and conditions.
        </p>
      </div>
    </footer>
  );
}
