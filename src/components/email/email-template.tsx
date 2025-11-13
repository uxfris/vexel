interface EmailTemplateProps {
  code: string;
}

export function EmailTemplate({ code }: EmailTemplateProps) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900">
          Your Verification Code
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Use the code below to complete your verification. This code will
          expire in 10 minutes.
        </p>
        <div className="inline-block bg-gray-100 rounded-lg px-8 py-4 text-3xl font-bold tracking-widest text-gray-900">
          {code}
        </div>
        <p className="mt-8 text-gray-400 text-xs">
          If you didn't request this, please ignore this email.
        </p>
      </div>
      <p className="mt-8 text-gray-400 text-xs">
        © {new Date().getFullYear()} Vexel. All rights reserved.
      </p>
    </div>
  );
}
