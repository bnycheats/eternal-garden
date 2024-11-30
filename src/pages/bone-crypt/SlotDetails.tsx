import CardContainer from '@/components/CardContainer';
import usePrivateHeader from '@/hooks/usePrivateHeader';

export function Component() {
  usePrivateHeader({
    title: 'Bone Crypt Slot Details',
    showBack: true,
  });

  return <CardContainer></CardContainer>;
}
