import Link from "next/link";
import React from "react";

type Props = {};

export const metadata = {
  title: "About this marketplace | My Marketplace",
  description: "Description of My Marketplace project",
};

function page({}: Props) {
  return (
    <div className="mx-auto max-w-2xl p-3 text-justify ">
      <div>
        <h1 className="font my-5 text-center text-2xl font-semibold">
          About My Marketplace
        </h1>
        <div className="text-md flex flex-col gap-4">
          <p>
            This marketplace was created by me, Oleksandr Liashchenko as a
            demonstration of my skill set.
          </p>
          <p>
            It was built with Next.js 14 framework with Postgres database,
            accessed via Prisma ORM. For UI Snadcn-ui component library is used
            with Tailwind styling.
          </p>
          <p>
            Authentication is done with Auth.js (the new name of Next-auth v5).
            Options for Google and Github OAuth authentication as well as via
            email and password, stored in the database, are available. In the
            last case, the full set of email sending is implemented - for email
            verification, including the case of password changing, password
            resetting via email, and sending a code to email in the optional
            case of two-factor authentication, that you can turn on on the
            setting page. Emails are created from templates and are sent via
            Nodemailer with Google SMTP.
          </p>
          <p>
            This is not just a shop with pre-programmed products or ones,
            created by a single owner according to a pre-programmed template of
            categories. Any authenticated user can create not only their
            products but entire categories with their own set of product
            properties with a set of possible options, like color, size, screen
            resolution, and so on.
          </p>
          <p>
            All the forms are made with a combination of react-hook-form, Zod
            validation, and Shadcn-UI component library. Particularly note the
            form for product creation, in which property value selection fields
            appear depending on the selected product category.
          </p>
          <p>
            Also notice the products filtering system, Prisma queries for which,
            which depend on the user-created categories system, I have made
            myself with nothing but Prisma documentation for reference.
          </p>
          <p>
            Also, notice how the shown products list completely corresponds to
            the URL, the price, the page number, and the search query included,
            so you can add the list of products, selected by you, to your
            browser bookmarks. The page title depends on the selected category
            or the product name for the same purpose.
          </p>
          <p>
            Stripe payment system is integrated, including its webhook, which
            changes order status in the database, decreases the quantity of the
            available products, and adds the data, the user inputted in the
            Stripe system, such as the phone number and delivery address.
          </p>
          <p>
            Note, that the user can simultaneously add to their cart products,
            created by different users and pay for them in one go, which creates
            separate order entities for each seller. You can see these orders
            both as buyer and seller in the corresponding menu items.
          </p>
          <p>
            For the shopping cart functionality Redux Toolkit is used, which
            persists data in the local storage with the redux-persist library,
            so the user can add the products to their cart without signing in
            for any time, and then sign in to pay.
          </p>
          <p>
            Dark theme switching is made with next-themes. It utilizes browser
            preffered theme as a default, but you can switch it in browser
            settings or developer tools and the site will switch the theme
            accordingly.
          </p>
          <p>Images for products and user image are uploaded to Cloudinary.</p>
          <p>For product description TinyMCE rich text editor is used.</p>
          <Link
            className="link-stand"
            href={`https://github.com/aleksandr04635/next-marketplace`}
          >
            You can see the code here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
