# NOTE: 
# Since July 03, 2025 exifoo is free to use and open source.
# Therefore, there is no need anymore to make sure the user can only use the free trial once 
# with a machine ID validation, so this is commented out.

# """
# Copyright (c) codeofandrin 
# 
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.
# """
# 
# from __future__ import annotations
# 
# import os
# from typing import TYPE_CHECKING
# 
# from supabase import create_client
# 
# if TYPE_CHECKING:
#     from supabase import Client
# 
# SUPABASE_URL = os.getenv("SUPABASE_URL")
# if SUPABASE_URL is None:
#     raise ValueError("'SUPABASE_URL' must be set")
# 
# SUPABASE_KEY = os.getenv("SUPABASE_KEY")
# if SUPABASE_KEY is None:
#     raise ValueError("'SUPABASE_KEY' must be set")
# 
# client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
# 
# 
# class MachineIDs:
# 
#     def exists(self, machine_id: str) -> bool:
#         response = client.rpc("exists_machine_id", {"mid_input": machine_id}).execute()
#         exists: bool = response.data
#         return exists
# 
#     def add(self, machine_id: str) -> None:
#         client.rpc("add_machine_id", {"mid_input": machine_id}).execute()
