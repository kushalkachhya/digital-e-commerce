import { render } from '@react-email/render';
import WelcomeEmail from '../welcome-email';

interface Props {
  params: {
    slug: string;
  };
}

const EmailPreview = async ({ params }: Props) => {
  let emailMarkup = "";

  if (params.slug === "welcome-email") {
    emailMarkup = await render(<WelcomeEmail />);
  }

  return (
    <div>
      <h1>Email Preview</h1>
      <div dangerouslySetInnerHTML={{ __html: emailMarkup }} />
    </div>
  );
};

export default EmailPreview