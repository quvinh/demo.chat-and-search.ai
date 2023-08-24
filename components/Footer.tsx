import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center">
      <div className="hidden sm:flex"></div>

      <div className="hidden sm:flex italic text-sm">
        Được tạo bởi nhóm demo&nbsp;<a href="https://absoltech.vn/" target="_blank" rel="noopener noreferrer"><u>ABSoltech</u></a>
      </div>

      <div className="flex space-x-4">
        {/* <a
          className="flex items-center hover:opacity-50"
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandTwitter size={24} />
        </a> */}

        <a
          className="flex items-center hover:opacity-50"
          href="https://github.com/quvinh/demo.chat-and-search.ai"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub size={24} />
        </a>
      </div>
    </div>
  );
};
