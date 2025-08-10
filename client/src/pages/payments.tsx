import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, History, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscriptionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/payments',
      },
    });

    setIsProcessing(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "You are now subscribed!",
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full"
        data-testid="button-subscribe"
      >
        {isProcessing ? 'Processing...' : 'Subscribe Now'}
      </Button>
    </form>
  );
};

export default function Payments() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  
  const [clientSecret, setClientSecret] = useState("");
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: payments = [], isLoading: paymentsLoading } = useQuery<any[]>({
    queryKey: ["/api/payments"],
    enabled: isAuthenticated,
    retry: false,
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/create-subscription");
      return response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setIsSubscriptionDialogOpen(true);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubscriptionSuccess = () => {
    setIsSubscriptionDialogOpen(false);
    setClientSecret("");
    queryClient.invalidateQueries({ queryKey: ["/api/payments"] });
    queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" data-testid="payments-container">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header 
          title="Payments & Subscription" 
          subtitle="Manage your subscription and view payment history."
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Subscription Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Subscription Status</p>
                      <p className="text-xl font-bold text-foreground" data-testid="text-subscription-status">
                        {'Premium'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <DollarSign className="w-6 h-6 text-success" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Monthly Spend</p>
                      <p className="text-xl font-bold text-foreground" data-testid="text-monthly-spend">
                        $29.99
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <CreditCard className="w-6 h-6 text-accent" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                      <p className="text-xl font-bold text-foreground" data-testid="text-payment-method">
                        •••• 4242
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Management */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 text-primary mr-2" />
                  Subscription Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current Plan */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Current Plan</h3>
                    <div className="p-6 border-2 border-primary rounded-lg bg-primary/5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-primary">Pro Plan</h4>
                        <Badge className="bg-primary text-primary-foreground">
                          Current
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold text-foreground mb-2">
                        $29.99<span className="text-sm text-muted-foreground font-normal">/month</span>
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-success mr-2" />
                          Unlimited content creation
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-success mr-2" />
                          AI-powered tools
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-success mr-2" />
                          Advanced analytics
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-success mr-2" />
                          Priority support
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        Next billing date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Plan Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Available Plans</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Free Plan</h4>
                          <span className="text-lg font-bold">$0</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Basic features for getting started
                        </p>
                        <Button variant="outline" disabled>
                          Current Plan
                        </Button>
                      </div>

                      <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-primary">Pro Plan</h4>
                          <span className="text-lg font-bold text-primary">$29.99</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Advanced features and AI tools
                        </p>
                        {(user as any)?.subscriptionStatus === 'active' ? (
                          <Button variant="outline" disabled>
                            Currently Active
                          </Button>
                        ) : (
                          <Dialog open={isSubscriptionDialogOpen} onOpenChange={setIsSubscriptionDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                className="w-full"
                                onClick={() => createSubscriptionMutation.mutate()}
                                disabled={createSubscriptionMutation.isPending}
                                data-testid="button-upgrade-pro"
                              >
                                {createSubscriptionMutation.isPending ? 'Loading...' : 'Upgrade to Pro'}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Subscribe to Pro Plan</DialogTitle>
                              </DialogHeader>
                              {clientSecret && (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                  <SubscriptionForm onSuccess={handleSubscriptionSuccess} />
                                </Elements>
                              )}
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 text-secondary mr-2" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
                  </div>
                ) : payments.length === 0 ? (
                  <div className="text-center py-8">
                    <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No Payment History
                    </h3>
                    <p className="text-muted-foreground">
                      Your payment transactions will appear here once you make a payment.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Payment ID
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {payments.map((payment: any) => (
                          <tr key={payment.id} className="hover:bg-muted/50" data-testid={`row-payment-${payment.id}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {payment.paymentType === 'subscription' ? 'Subscription' : 'One-time'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                              ${payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={getStatusColor(payment.status)} data-testid={`status-${payment.id}`}>
                                <span className="flex items-center">
                                  {getStatusIcon(payment.status)}
                                  <span className="ml-1">{payment.status}</span>
                                </span>
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground font-mono">
                              {payment.stripePaymentIntentId?.substring(0, 20)}...
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
