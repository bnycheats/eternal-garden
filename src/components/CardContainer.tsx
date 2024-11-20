import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const CardContainer = forwardRef<HTMLDivElement, CardContainerProps>(
  function CardContainer(props, ref) {
    const { className, children, ...other } = props;
    return (
      <div
        ref={ref}
        className={cn(
          "mb-10 rounded-sm border border-stroke bg-white px-7 py-4 shadow-default dark:border-strokedark dark:bg-boxdark",
          className
        )}
        {...other}
      >
        {children}
      </div>
    );
  }
);

type CardContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default CardContainer;
