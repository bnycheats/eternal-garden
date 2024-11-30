import CardContainer from '@/components/CardContainer';
import RegisterClientForm from './components/RegisterClientForm';
import usePrivateHeader from '@/hooks/usePrivateHeader';

export function Component() {
  usePrivateHeader({
    title: 'Create Client',
    showBack: true,
  });

  return (
    <CardContainer>
      <RegisterClientForm />
    </CardContainer>
  );
}
