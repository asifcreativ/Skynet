using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrderWithItemsAndOrderingSpecification(string email) : base(q => q.BuyerEmail == email)
        {
            AddInclude(q => q.OrderItems);
            AddInclude(q => q.DeliveryMethod);
            AddOrderByDecending(q => q.OrderDate);
        }

        public OrderWithItemsAndOrderingSpecification(int id, string email)
            : base(q => q.Id == id && q.BuyerEmail == email)
        {
            AddInclude(q => q.OrderItems);
            AddInclude(q => q.DeliveryMethod);
        }
    }
}
