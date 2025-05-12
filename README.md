# 📚 Book Store

This project allows users to upload books (PDF and cover image), assign chapters with start and end pages, and store this metadata in the database. Files are uploaded directly to AWS S3 using presigned URLs. Chapters can also be edited or deleted. The project uses JWT for authentication and NodeMailer for sending emails.

> ⚠️ Chapter summary generation is a planned feature, but due to time constraints, it is not yet implemented. It will be completed during the break. However, the current version fulfills all required project criteria.

---

## 🎥 Demo Video

[Click here to watch the demo](https://drive.google.com/file/d/1jt0gN64UKe2-3AzO4se-1Ca-J9hk80T0/view?usp=sharing)

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Storage:** AWS S3 with Presigned URLs
- **Authentication:** JWT
- **Email Support:** NodeMailer

---

## 📁 Features

- Upload book PDF and cover image
- Assign chapter name, start page, and end page
- Save metadata to MongoDB
- Secure S3 file uploads using presigned URLs
- View, edit, and delete chapters
- JWT-authenticated routes
- Email support with NodeMailer

---

## ⚙️ How It Works

1. User uploads a PDF and an image.
2. Backend provides presigned S3 URLs.
3. Frontend uploads the files directly to S3.
4. Metadata (book name, file URLs, chapters, etc.) is saved to the database.
5. User can view, edit, or delete chapters.

---



