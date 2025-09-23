import { CheckIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';
import { Button } from '@/components/ui';
import plans from './data/pricing.json';

const PricingSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-6">
      <div className="flex flex-col justify-center space-y-6">
        <h2 className="text-center text-4xl font-bold normal-case">
          {t('pricing')}
        </h2>
        <p className="text-center text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {plans.map((plan: any, index: number) => (
              <article
                key={`plan-${index}`}
                className="card bg-base-100 shadow border border-gray-300 dark:border-gray-200 rounded-md"
              >
                <div className="card-body">
                  <h3 className="card-title">
                    {plan.currency} {plan.amount} / {plan.duration}
                  </h3>

                  <p>{plan.description}</p>

                  <div className="mt-5">
                    <ul className="flex flex-col space-y-2">
                      {plan.benefits.map((benefit: string, itemIndex: number) => (
                        <li
                          key={`plan-${index}-benefit-${itemIndex}`}
                          className="flex items-center"
                        >
                          <CheckIcon className="h-5 w-5" />
                          <span className="ml-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-actions justify-center mt-4">
                    <Button size="default" className="w-3/4 md:w-full rounded-md">
                      {t('buy-now')}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
