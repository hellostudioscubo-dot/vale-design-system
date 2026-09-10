import { Button } from "@/components/atoms/Button";
import { Text } from "@/foundations";
import { GoogleIcon, AppleIcon } from "@/icons";
import { cn } from "@/lib/utils";

/**
 * LoginScreen — Figma: Fluxo do App - mobile → "Login opcional". Every auth
 * action is a callback (`onGoogle`, `onApple`, `onEmail`,
 * `onContinueWithoutAccount`) — this template never talks to an auth
 * provider itself, same boundary as `Modal` owning presentation but not
 * business logic.
 */
export interface LoginScreenProps {
  onGoogle: () => void;
  onApple: () => void;
  onEmail: () => void;
  onContinueWithoutAccount: () => void;
  title?: string;
  subtitle?: string;
  legalText?: string;
  className?: string;
}

export function LoginScreen({
  onGoogle,
  onApple,
  onEmail,
  onContinueWithoutAccount,
  title = "Quer guardar seu progresso?",
  subtitle = "Assim você não perde nada se trocar de celular.",
  legalText = "Ao continuar, você aceita os Termos de Uso e a Política de Privacidade.",
  className,
}: LoginScreenProps) {
  return (
    <div className={cn("flex h-full min-h-[844px] w-full flex-col bg-surface-muted px-6 pb-8 pt-12", className)}>
      <Text variant="display">{title}</Text>
      <Text variant="corpo" className="mt-2 text-text-secondary">
        {subtitle}
      </Text>

      <div className="flex flex-1 flex-col justify-end gap-3">
        <Button variant="secondary" onClick={onGoogle} className="justify-start gap-3">
          <GoogleIcon width={18} height={18} />
          Continuar com Google
        </Button>
        <Button variant="secondary" onClick={onApple} className="justify-start gap-3">
          <AppleIcon width={16} height={18} />
          Continuar com Apple
        </Button>
        <Button variant="secondary" onClick={onEmail}>
          Criar conta com e-mail
        </Button>

        <button
          type="button"
          onClick={onContinueWithoutAccount}
          className="mt-2 font-body text-corpo font-medium text-primary-onSurface"
        >
          Continuar sem conta
        </button>

        <p className="text-center font-body text-legenda text-text-secondary opacity-80">
          {legalText}
        </p>
      </div>
    </div>
  );
}
