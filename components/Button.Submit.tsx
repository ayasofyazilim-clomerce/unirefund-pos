import { useState } from 'react';
import { ActivityIndicator, Button, ButtonProps, MD2Colors } from 'react-native-paper';

type SubmitButtonProps<T> = ButtonProps & {
  onSubmit: () => Promise<T>;
  reActivate?: boolean;
};

function SubmitButton(args: SubmitButtonProps<any>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit() {
    setIsSubmitting(true);
    args.onSubmit().then(() => setIsSubmitting(false));
  }

  return (
    <Button
      {...args}
      onPress={onSubmit}
      disabled={args.disabled || isSubmitting}
      icon={
        isSubmitting
          ? () => <ActivityIndicator animating={true} color={MD2Colors.white} />
          : args.icon
      }>
      {args.children}
    </Button>
  );
}

export default SubmitButton;
