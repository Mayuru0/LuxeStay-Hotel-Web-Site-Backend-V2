import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #1e40af; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">LuxeStay Hotel</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0 0;">Email Verification</p>
        </div>
        <div style="padding: 40px 32px;">
          <h2 style="color: #1e293b; margin-top: 0;">Verify Your Email Address</h2>
          <p style="color: #64748b; line-height: 1.6;">Thank you for registering with LuxeStay Hotel. Please use the OTP below to verify your email address.</p>
          <div style="background-color: #eff6ff; border: 2px dashed #1e40af; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
            <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px;">Your One-Time Password</p>
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1e40af;">${otp}</span>
          </div>
          <p style="color: #64748b; font-size: 14px;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 32px;">If you did not create an account, please ignore this email.</p>
        </div>
        <div style="background-color: #f8fafc; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} LuxeStay Hotel. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: "LuxeStay Hotel - Email Verification OTP",
    html,
  });
};

export const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  const transporter = createTransporter();

  const { bookingId, roomName, checkInDate, checkOutDate, totalAmount, nights, guestName } = bookingDetails;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Booking Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #1e40af; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">LuxeStay Hotel</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0 0;">Booking Confirmation</p>
        </div>
        <div style="padding: 40px 32px;">
          <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
            <p style="color: #16a34a; font-weight: bold; margin: 0;">Booking Request Received!</p>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Your booking is pending confirmation from our team.</p>
          </div>
          <h2 style="color: #1e293b; margin-top: 0;">Hello, ${guestName || "Guest"}!</h2>
          <p style="color: #64748b; line-height: 1.6;">Thank you for choosing LuxeStay Hotel. Here are your booking details:</p>

          <div style="background-color: #f8fafc; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Booking ID</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${bookingId}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Room</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${roomName || "N/A"}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Check-In</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${new Date(checkInDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Check-Out</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${new Date(checkOutDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Nights</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${nights || "N/A"}</td>
              </tr>
              <tr style="border-top: 2px solid #1e40af; background-color: #eff6ff;">
                <td style="padding: 12px 0 12px 8px; color: #1e40af; font-weight: bold;">Total Amount</td>
                <td style="padding: 12px 8px 12px 0; color: #1e40af; font-weight: bold; font-size: 18px; text-align: right;">$${Number(totalAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
              </tr>
            </table>
          </div>

          <p style="color: #64748b; font-size: 14px;">You will receive another email once your booking is confirmed by our team.</p>
        </div>
        <div style="background-color: #f8fafc; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} LuxeStay Hotel. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: `LuxeStay Hotel - Booking Confirmation #${bookingId}`,
    html,
  });
};

export const sendBookingStatusEmail = async (email, booking, status) => {
  const transporter = createTransporter();

  const isConfirmed = status === "confirmed";
  const isCancelled = status === "cancelled";

  const statusConfig = {
    confirmed: {
      color: "#16a34a",
      bgColor: "#f0fdf4",
      borderColor: "#16a34a",
      title: "Booking Confirmed!",
      message: "Great news! Your booking has been confirmed. We look forward to welcoming you.",
      subject: `Booking Confirmed - #${booking.bookingId}`,
    },
    cancelled: {
      color: "#dc2626",
      bgColor: "#fef2f2",
      borderColor: "#dc2626",
      title: "Booking Cancelled",
      message: "Your booking has been cancelled. If you have any questions, please contact us.",
      subject: `Booking Cancelled - #${booking.bookingId}`,
    },
  };

  const config = statusConfig[status] || statusConfig["confirmed"];

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Booking Status Update</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #1e40af; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">LuxeStay Hotel</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0 0;">Booking Status Update</p>
        </div>
        <div style="padding: 40px 32px;">
          <div style="background-color: ${config.bgColor}; border-left: 4px solid ${config.borderColor}; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
            <p style="color: ${config.color}; font-weight: bold; margin: 0; font-size: 18px;">${config.title}</p>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">${config.message}</p>
          </div>

          <div style="background-color: #f8fafc; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Booking ID</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${booking.bookingId}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Check-In</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${new Date(booking.checkInDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Check-Out</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">${new Date(booking.checkOutDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Status</td>
                <td style="padding: 8px 0; text-align: right;">
                  <span style="background-color: ${config.bgColor}; color: ${config.color}; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; text-transform: capitalize;">${status}</span>
                </td>
              </tr>
              ${isCancelled && booking.reason ? `
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Reason</td>
                <td style="padding: 8px 0; color: #1e293b; text-align: right;">${booking.reason}</td>
              </tr>` : ""}
              <tr style="border-top: 2px solid #1e40af; background-color: #eff6ff;">
                <td style="padding: 12px 0 12px 8px; color: #1e40af; font-weight: bold;">Total Amount</td>
                <td style="padding: 12px 8px 12px 0; color: #1e40af; font-weight: bold; font-size: 18px; text-align: right;">$${Number(booking.totalAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
              </tr>
            </table>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} LuxeStay Hotel. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: config.subject,
    html,
  });
};
