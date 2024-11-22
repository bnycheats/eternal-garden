import { Card, CardContent, CardHeader } from '@/components/ui/card';
import LoginForm from './components/LoginForm';

export function Component() {
  return (
    <div className="login-bg">
      <Card className="absolute left-1/2 border-0 top-1/4 w-[400px] bg-white -translate-x-1/2">
        <CardHeader className="text-2xl text-center">ADMINISTRATOR</CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
