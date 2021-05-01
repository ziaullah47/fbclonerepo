using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace fb_clone.Exceptions
{
    public class ResourceAlreadyExistException : Exception
    {
        public ResourceAlreadyExistException()
        {
        }

        public ResourceAlreadyExistException(string message) : base(message)
        {
        }

        public ResourceAlreadyExistException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected ResourceAlreadyExistException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
