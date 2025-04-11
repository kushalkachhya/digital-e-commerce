import { render } from '@react-email/render';
import WelcomeEmail from '../welcome-email';

interface Props {
  params: {
    slug: string;
  };
}

export default function EmailPreview({ params }: Props) {
    let emailMarkup: string = '';

  if (params.slug === 'welcome-email') {
    emailMarkup = render(<WelcomeEmail />);
  }

  return <div dangerouslySetInnerHTML={{ __html: emailMarkup }} />;
}
