using fb_clone.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace fb_clone.Exceptions
{
    public class ValidationException : Exception
    {
        public List<ValidationError> Errors { get; set; }
        public ValidationException(List<ValidationError> errors)
        {
            Errors = errors;
        }

        public ValidationException(string message) : base(message)
        {
        }

        public ValidationException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected ValidationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
