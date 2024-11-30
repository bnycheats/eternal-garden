import CardContainer from '@/components/CardContainer';
import { Button } from '@/components/ui/button';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { paths } from '@/navigation/Routes';
import { useNavigate } from 'react-router-dom';

export function Component() {
  const navigate = useNavigate();

  usePrivateHeader({
    title: 'Clients',
    extra: (
      <div className="flex justify-center gap-2">
        <Button onClick={() => navigate(paths.authenticated.CLIENTS_CREATE)}>Register Client</Button>
      </div>
    ),
  });

  return <CardContainer></CardContainer>;
}
