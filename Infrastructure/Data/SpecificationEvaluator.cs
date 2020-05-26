using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
        {

            var query = inputQuery;

            if (spec.Criteria != null)
                query = query.Where(spec.Criteria);

            // Ordering
            if (spec.OrderBy != null)
                query = query.OrderBy(spec.OrderBy);

            if (spec.OrderByDecending != null) query =
                query.OrderByDescending(spec.OrderByDecending);

            // Paging
            if (spec.IsPagingEnabled)
                query = query.Skip(spec.Skip).Take(spec.Take);

            // Includes
            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }

    }
}