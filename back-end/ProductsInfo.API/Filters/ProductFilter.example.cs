using Google.Protobuf.WellKnownTypes;
using System.Runtime.Serialization;

namespace Products.API.Filters
{
    public class ProductFilters
    {
        // Other filters here

    }
    public enum ProductStatuses
    {
        [EnumMember(Value = "Active")]
        Active,

        [EnumMember(Value = "Inactive")]
        Inactive,

        [EnumMember(Value = "LowStock")]
        LowStock
    }
}
