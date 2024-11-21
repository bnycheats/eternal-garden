import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Password from '@/components/Password';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/supabase-client/mutations/auth';
import { paths } from '@/navigation/Routes';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (request: z.infer<typeof FormSchema>) => login(request.email, request.password),
    onSuccess: () => navigate(paths.authenticated.DASHBOARD),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => loginMutation.mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={loginMutation.isPending} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} type="email" placeholder="Email Address*" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Password {...field} placeholder="Password*" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">
            {loginMutation.isPending && <Spinner className="h-5 w-5 text-white" />}Login
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
