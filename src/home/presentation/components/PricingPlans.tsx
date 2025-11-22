import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Check } from "lucide-react"
import { Link } from "react-router"
import { useScrollAnimation } from "@/shared/hooks/use-scroll-animation"

interface PlanFeature {
    text: string;
    included: boolean;
    emphasized?: boolean;
}

interface PricingPlan {
    title: string;
    description: string;
    price: number;
    period: string;
    features: PlanFeature[];
    buttonText: string;
    buttonLink: string;
    buttonVariant?: "outline" | "default";
    highlighted?: boolean;
    badge?: string;
}

const pricingPlans: PricingPlan[] = [
    {
        title: "Plan Gratis",
        description: "Perfecto para comenzar",
        price: 0,
        period: "/mes",
        features: [
            { text: "Hasta 50 citas por mes", included: true },
            { text: "Calendario semanal", included: true },
            { text: "Gestión de clientes básica", included: true },
            { text: "Formulario de reservas público", included: true },
            { text: "Notificaciones por email", included: false },
        ],
        buttonText: "Comenzar Gratis",
        buttonLink: "/auth/register",
        buttonVariant: "outline",
    },
    {
        title: "Plan Premium",
        description: "Para negocios en crecimiento",
        price: 50,
        period: "/mes",
        features: [
            { text: "Citas ilimitadas", included: true, emphasized: true },
            { text: "Todo del plan Gratis", included: true, emphasized: true },
            { text: "Dashboard con métricas avanzadas", included: true, emphasized: true },
            { text: "Notificaciones automáticas (Email + SMS)", included: true, emphasized: true },
            { text: "Recordatorios automáticos", included: true, emphasized: true },
            { text: "Soporte prioritario", included: true, emphasized: true },
        ],
        buttonText: "Comenzar Prueba Gratis",
        buttonLink: "/auth/register?plan=premium",
        buttonVariant: "default",
        highlighted: true,
        badge: "Más Popular",
    },
];

export const PricingPlans = () => {
    const { elementRef, isVisible } = useScrollAnimation();

    return (
        <section
            id="planes"
            ref={elementRef as React.RefObject<HTMLElement>}
            className={`py-12 sm:py-16 md:py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 animate-fade-up animate-duration-[2000ms]' : 'opacity-0 translate-y-10'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">Planes para cada tipo de negocio</h2>
                    <p className="text-base sm:text-lg text-muted-foreground">Comienza gratis y escala cuando lo necesites</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {pricingPlans.map((plan) => (
                        <Card
                            key={plan.title}
                            className={`relative flex flex-col ${plan.highlighted ? "border-primary shadow-lg" : ""}`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full dark:text-white">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}
                            <CardHeader className="pb-4 sm:pb-6">
                                <CardTitle className="text-xl sm:text-2xl">{plan.title}</CardTitle>
                                <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                                <div className="mt-3 sm:mt-4">
                                    <span className="text-3xl sm:text-4xl font-bold text-foreground">${plan.price}</span>
                                    <span className="text-sm sm:text-base text-muted-foreground">{plan.period}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow pb-4 sm:pb-6">
                                <ul className="space-y-2 sm:space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <Check
                                                className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5 ${feature.included ? "text-primary" : "text-muted-foreground"
                                                    }`}
                                            />
                                            <span
                                                className={`text-xs sm:text-sm ${feature.emphasized ? "font-medium" : ""
                                                    } ${!feature.included ? "text-muted-foreground" : ""}`}
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-4 sm:pt-6">
                                <Button
                                    className={`w-full ${plan.buttonVariant === "outline" ? "bg-transparent" : ""}`}
                                    variant={plan.buttonVariant}
                                    asChild
                                >
                                    <Link to={plan.buttonLink}>{plan.buttonText}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
