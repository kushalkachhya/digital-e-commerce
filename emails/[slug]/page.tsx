import { render } from '@react-email/render';
import WelcomeEmail from '../welcome-email';

interface Props {
  params: {
    slug: string;
  };
}

export default function EmailPreview({ params }: Props) {
    let emailMarkup: '';

  if (params.slug === 'welcome-email') {
    emailMarkup = await render(<WelcomeEmail />);
  }

  return <div dangerouslySetInnerHTML={{ __html: emailMarkup }} />;
}
