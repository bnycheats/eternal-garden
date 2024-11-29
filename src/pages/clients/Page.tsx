import CardContainer from '@/components/CardContainer';
import { Button } from '@/components/ui/button';
import { paths } from '@/navigation/Routes';
import { useNavigate } from 'react-router-dom';

export function Component() {
  const navigate = useNavigate();
  return (
    <CardContainer>
      <Button onClick={() => navigate(paths.authenticated.CLIENTS_CREATE)}>Register Client</Button>
    </CardContainer>
  );
}
