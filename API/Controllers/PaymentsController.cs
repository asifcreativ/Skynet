using System.IO;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private const string WhSecret = "whsec_h2nIPf4vvZXEPLVlcDsCItgGwf2HhHOO";
        private readonly IPaymentService _paymentService;
        private readonly ILogger<IPaymentService> _logger;

        public PaymentsController(IPaymentService paymentService, ILogger<IPaymentService> logger)
        {
            _logger = logger;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var customerBasket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

            if (customerBasket == null)
            {
                return BadRequest(new ApiResponse(400, "Problem with your basket"));
            }

            return Ok(customerBasket);
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stipeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stipe-Signature"], WhSecret);

            PaymentIntent paymentIntent;
            Core.Entities.OrderAggregate.Order order;

            switch (stipeEvent.Type)
            {
                case "payment_intent.succeeded":
                    paymentIntent = (PaymentIntent)stipeEvent.Data.Object;
                    _logger.LogInformation("Payment successful", paymentIntent.Id);
                    order = await _paymentService.UpdateOrderPaymentSucceeded(paymentIntent.Id);
                    _logger.LogInformation("Order update payment successful", paymentIntent.Id);
                    break;
                case "payment_intent.failed":
                    paymentIntent = (PaymentIntent)stipeEvent.Data.Object;
                    _logger.LogInformation("Payment failed", paymentIntent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(paymentIntent.Id);
                    _logger.LogInformation("Order update payment failed", paymentIntent.Id);
                    break;
            }
            return new EmptyResult();
        }
    }
}
