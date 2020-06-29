using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    // NOTE: EnumMember override the enum numeric value to string
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "Payment Received")]
        PaymentReceived,

        [EnumMember(Value = "Payment Failed")]
        PaymentFailed
    }
}
