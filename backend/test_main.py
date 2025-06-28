from run_listing_pipeline import run_listing_pipeline

# The function now takes base_keywords as a third argument and an optional upload flag.
# For this test, we'll provide some default base_keywords and test the default upload=False.
print(run_listing_pipeline('test product', 'test details', 'generic, common'))

# Example of how to test with upload=True (though this might actually attempt an upload if not mocked):
# print(run_listing_pipeline('test product', 'test details', 'generic, common', upload=True))