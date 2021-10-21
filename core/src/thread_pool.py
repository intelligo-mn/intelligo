"""
Super ThreadPoolExecutor class to get stack trace from exceptions inside pool
"""
import sys
import traceback
from concurrent.futures import ThreadPoolExecutor

class ThreadPoolExecutorStackTraced(ThreadPoolExecutor):

    def submit(self, fn, *args, **kwargs):
        """Submits the wrapped function instead of `fn`"""

        return super(ThreadPoolExecutorStackTraced, self).submit(
            self._function_wrapper, fn, *args, **kwargs)

    @classmethod
    def _function_wrapper(cls, fn, *args, **kwargs):
        """Wraps `fn` in order to preserve the traceback of any kind of
        raised exception

        """
        try:
            return fn(*args, **kwargs)
        except Exception:
            raise sys.exc_info()[0](traceback.format_exc())
