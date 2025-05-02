
import { supabase } from "@/integrations/supabase/client";

// Function to upload a file to storage
export const uploadFile = async (
  file: File,
  bucket: string = "media"
): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

// Function to list files in storage
export const listFiles = async (bucket: string = "media"): Promise<any[]> => {
  try {
    const { data, error } = await supabase.storage.from(bucket).list();

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
};

// Function to delete a file from storage
export const deleteFile = async (
  path: string,
  bucket: string = "media"
): Promise<boolean> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

// Function to get a public URL for a file
export const getFileUrl = (
  path: string,
  bucket: string = "media"
): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
