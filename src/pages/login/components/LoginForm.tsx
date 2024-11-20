import { zodResolver } from '@hookform/resolvers/zod';
// import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Password from '@/components/Password';
// import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export default function LoginForm() {
  //   const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Button className="w-full">Login</Button>
      </form>
    </Form>
  );
}
